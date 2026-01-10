#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables
const SUPABASE_URL = 'https://ulspfbgslsxdzxhseraz.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsc3BmYmdzbHN4ZHp4aHNlcmF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTg4MjI5NiwiZXhwIjoyMDc3NDU4Mjk2fQ.kb4pJW41ADOCqIWzaSxl8so4bO7wUavMEbap18irM6o';

console.log('🚀 Setting up Supabase database...\n');

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function setupDatabase() {
  try {
    // Read SQL file
    const sql = fs.readFileSync('./create_tables.sql', 'utf8');
    
    console.log('📝 Executing SQL schema...');
    
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`   Found ${statements.length} SQL statements\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`   [${i + 1}/${statements.length}] Executing...`);
      
      try {
        // Use rpc to execute raw SQL
        const { data, error } = await supabase.rpc('exec_sql', { query: statement });
        
        if (error) {
          console.log(`   ⚠️  Warning: ${error.message}`);
        } else {
          console.log(`   ✅ Success`);
        }
      } catch (err) {
        console.log(`   ⚠️  Warning: ${err.message}`);
      }
    }
    
    console.log('\n✅ Database setup complete!');
    console.log('\n🧪 Verifying tables...\n');
    
    // Verify tables exist
    const tables = ['jobs', 'scraped_ads', 'assets', 'events'];
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('count').limit(0);
      if (error) {
        console.log(`   ❌ Table '${table}': NOT FOUND (${error.message})`);
      } else {
        console.log(`   ✅ Table '${table}': EXISTS`);
      }
    }
    
    console.log('\n🎉 Setup verification complete!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
