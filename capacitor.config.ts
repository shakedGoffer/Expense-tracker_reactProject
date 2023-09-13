import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.expensetracker',
  appName: 'Expense Tracker',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
