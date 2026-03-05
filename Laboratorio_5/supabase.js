// Project settings --> Data API --> Copy Initializing code and paste it here

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://axopuhzieuuuwvxiaogy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b3B1aHppZXV1dXd2eGlhb2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0Njc2MzksImV4cCI6MjA4NzA0MzYzOX0.qp4RFehu1Xs9z53hRwHw7qNUrNYMGJy6ursVWMR0cXI'
const supabase = createClient(supabaseUrl, supabaseKey)