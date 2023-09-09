import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xmanpe.app',
  appName: 'CrossPlat-Week2',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
