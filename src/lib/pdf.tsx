/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { pdf } from '@react-pdf/renderer';
import { ResumePDF } from '../components/ResumePDF';
import React from 'react';

export const generatePDF = async (fileName: string = 'resume.pdf') => {
  try {
    const blob = await pdf(<ResumePDF />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

