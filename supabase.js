import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
export const supabase = createClient(supabaseUrl, supabaseKey);


// Function to sync notes with Supabase when online
async function syncNotesWithSupabase() {
    const { data: notes, error } = await supabase
      .from('notes')
      .select('*');
  
    if (error) {
      console.error('Error fetching notes from Supabase:', error);
    } else {
      notes.forEach(note => {
        saveNoteToIndexedDB(note);
      });
      console.log('Notes synced with Supabase');
    }
  }
  
  // Function to add a new note to Supabase
  async function addNoteToSupabase(noteContent) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ content: noteContent }]);
  
    if (error) {
      console.error('Error adding note to Supabase:', error);
    } else {
      console.log('Note added to Supabase:', data);
      saveNoteToIndexedDB(data[0]); // Also save note offline in IndexedDB
    }
  }
  