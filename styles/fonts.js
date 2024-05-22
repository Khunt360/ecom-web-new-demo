// fonts.js
import { Manuale, Montserrat, Mulish, Urbanist } from 'next/font/google';

// Configure the fonts
export const manuale = Manuale({ subsets: ['latin'], weights: [300, 400, 500, 600, 700, 800], variable: "--font-manuale"});
export const montserrat = Montserrat({ subsets: ['latin'], weights: [300, 400, 500, 600, 700, 800], variable: "--font-montserrat" });
export const mulish = Mulish({ subsets: ['latin'], weights: [200, 300, 400, 500, 600, 700, 800, 900], variable: "--font-mulish" });
export const urbanist = Urbanist({ subsets: ['latin'], weights: [100, 200, 300, 400, 500, 600, 700, 800],variable: "--font-urbanist" });
