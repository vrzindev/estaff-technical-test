import { AsoFormData } from '../types/aso';

/**
 * Mock service for the ASO flow.
 * In a real scenario, this would connect to an API (e.g., using fetch or axios).
 */
export const asoService = {
  /**
   * Sends the ASO form data to the server.
   * Returns a Promise that resolves after 2 seconds, simulating network delay.
   *
   * @param data Validated form data
   * @returns Mocked response with success status
   */
  submitAsoData: async (data: AsoFormData): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      console.log('--- SENDING DATA TO API ---');
      console.log(JSON.stringify(data, null, 2));

      setTimeout(() => {
        console.log('--- DATA SAVED SUCCESSFULLY ---');
        resolve({
          success: true,
          message: 'Dados salvos com sucesso!',
        });
      }, 2000); // 2 seconds simulation
    });
  },
};
