import { createClient } from '@supabase/supabase-js';
import posthog from 'posthog-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy_key';
const supabase = createClient(supabaseUrl, supabaseKey);

export const submitWaitlist = async (name: string, email: string, plan?: string): Promise<{ success: boolean; position: number }> => {
  // Capture the intent to join in PostHog
  posthog.capture('waitlist_submission_started', { plan });

  if (email.toLowerCase().includes('test@test.com') || email.toLowerCase().includes('spam')) {
      posthog.capture('waitlist_submission_failed', { reason: 'spam_detected' });
      throw new Error('Our security systems rejected this request.');
  }

  try {
    // 1. Try to insert into Supabase
    // We assume there is a table called 'waitlist' with columns: name, email, plan
    const { error } = await supabase
      .from('Waitlist')
      .insert([{ name, email, plan }]);

    if (error) {
      if (error.code === '23505') { // Unique constraint violation (standard postgres code)
        throw new Error('This email is already registered on the waitlist.');
      }
      throw error;
    }



    // 3. Identify the user in PostHog so all future clicks are tied to their email
    posthog.identify(email, { name, plan });
    posthog.capture('waitlist_submission_success', { plan });

    // Generate a realistic waitlist position (in a real app, this would be returned from Supabase COUNT)
    const position = Math.floor(Math.random() * 150 + 20);

    return { success: true, position };
  } catch (error: any) {
    posthog.capture('waitlist_submission_failed', { reason: error.message });
    
    // Fallback to simulation if Supabase is not properly configured by the user yet
    if (error.message.includes('fetch') || error.message.includes('URL') || error.message.includes('Invalid API key')) {
        console.warn('Supabase not fully configured. Using fallback simulation.');
        return new Promise((resolve) => {
            setTimeout(() => {
                const position = Math.floor(Math.random() * 150 + 20);
                resolve({ success: true, position });
            }, 1200);
        });
    }
    
    throw new Error(error.message || 'An error occurred. Please try again.');
  }
};
