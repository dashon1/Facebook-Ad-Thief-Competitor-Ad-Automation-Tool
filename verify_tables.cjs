const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ulspfbgslsxdzxhseraz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsc3BmYmdzbHN4ZHp4aHNlcmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4ODIyOTYsImV4cCI6MjA3NzQ1ODI5Nn0.CwMPUw-M13DbxfV2cK20wB0u6ir7PiA4SXRjDtiKIs0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function verifyTables() {
  console.log('🔍 Checking if tables exist...\n');
  
  const tables = ['jobs', 'scraped_ads', 'assets', 'events'];
  let allExist = true;
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('count').limit(0);
      if (error) {
        console.log(`❌ Table '${table}': NOT FOUND - ${error.message}`);
        allExist = false;
      } else {
        console.log(`✅ Table '${table}': EXISTS`);
      }
    } catch (err) {
      console.log(`❌ Table '${table}': ERROR - ${err.message}`);
      allExist = false;
    }
  }
  
  console.log('\n' + (allExist ? '✅ All tables exist! Database is ready!' : '❌ Some tables are missing'));
  
  if (allExist) {
    console.log('\n🎉 Your app should work now!');
    console.log('Try it at: https://ad-thief.pages.dev\n');
  }
}

verifyTables();
