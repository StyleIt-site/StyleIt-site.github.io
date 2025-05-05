import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

document.getElementById('waitlist-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  
  try {
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);
    
    if (error) throw error;
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.classList.remove('hidden');
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 3000);
    
    // Clear form
    e.target.reset();
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
  }
});