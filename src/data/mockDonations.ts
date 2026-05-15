import { Donation, Booking } from '../types';

export const mockDonations: Donation[] = [
  { id: 'd_001', date: '2026-01-14', centerId: 'c_001', centerName: 'AVIS Torino', donationType: 'Sangue Intero', volume: '450 ml', documentId: 'doc_001' },
  { id: 'd_002', date: '2025-10-08', centerId: 'c_002', centerName: 'Ospedale Molinette', donationType: 'Plasma', volume: '600 ml', documentId: 'doc_002' },
  { id: 'd_003', date: '2025-07-22', centerId: 'c_001', centerName: 'AVIS Torino', donationType: 'Sangue Intero', volume: '450 ml', documentId: 'doc_003' },
  { id: 'd_004', date: '2025-04-03', centerId: 'c_003', centerName: 'CTO Torino', donationType: 'Piastrine', volume: '200 ml', documentId: 'doc_004' },
  { id: 'd_005', date: '2025-01-18', centerId: 'c_001', centerName: 'AVIS Torino', donationType: 'Sangue Intero', volume: '450 ml', documentId: 'doc_005' },
  { id: 'd_006', date: '2024-10-05', centerId: 'c_002', centerName: 'Ospedale Molinette', donationType: 'Plasma', volume: '600 ml', documentId: 'doc_006' },
  { id: 'd_007', date: '2024-07-19', centerId: 'c_001', centerName: 'AVIS Torino', donationType: 'Sangue Intero', volume: '450 ml', documentId: 'doc_007' },
  { id: 'd_008', date: '2024-04-08', centerId: 'c_004', centerName: 'San Giovanni Bosco', donationType: 'Sangue Intero', volume: '450 ml', documentId: 'doc_008' },
  { id: 'd_009', date: '2024-01-22', centerId: 'c_001', centerName: 'AVIS Torino', donationType: 'Plasma', volume: '600 ml', documentId: 'doc_009' },
  { id: 'd_010', date: '2023-09-14', centerId: 'c_003', centerName: 'CTO Torino', donationType: 'Sangue Intero', volume: '450 ml', documentId: 'doc_010' },
  { id: 'd_011', date: '2023-06-01', centerId: 'c_001', centerName: 'AVIS Torino', donationType: 'Sangue Intero', volume: '450 ml', documentId: 'doc_011' },
  { id: 'd_012', date: '2023-02-17', centerId: 'c_002', centerName: 'Ospedale Molinette', donationType: 'Plasma', volume: '600 ml', documentId: 'doc_012' },
];

export const mockUpcomingBooking: Booking = {
  id: 'b_001',
  centerId: 'c_001',
  centerName: 'AVIS Comunale Torino',
  centerAddress: 'Via Nizza, 131',
  date: '2026-07-15',
  time: '08:30',
  donationType: 'Sangue Intero',
  status: 'confermata',
  notes: 'Portare documento di identità e tessera sanitaria',
};
