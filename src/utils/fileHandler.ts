import * as DocumentPicker from 'expo-document-picker';

export const pickPdfDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;

  const file = result.assets[0];
  return {
    name: file.name,
    uri: file.uri,
    type: file.mimeType || 'application/pdf',
    size: file.size || 0,
  };
};
