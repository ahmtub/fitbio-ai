// utils/pdfHelper.js

import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

/**
 * Herhangi bir HTML içeriğini PDF olarak kaydedip paylaşır
 * @param {string} htmlContent - PDF içeriği olarak bastırılacak HTML
 * @param {string} fileName - Oluşacak dosya ismi (uzantı gerekmez)
 */
export async function saveAndSharePDF(htmlContent, fileName = 'FitBioAI_Rapor') {
  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    const fullPath = `${FileSystem.documentDirectory}${fileName}_${Date.now()}.pdf`;

    await FileSystem.copyAsync({
      from: uri,
      to: fullPath
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fullPath);
    } else {
      alert('Paylaşım özelliği bu cihazda desteklenmiyor.');
    }
  } catch (err) {
    console.error("PDF oluşturulurken hata oluştu:", err);
    alert("PDF oluşturulamadı. Lütfen tekrar deneyin.");
  }
}
