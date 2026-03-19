// Using external URLs for demonstration. Replace with require('../../../assets/...') in true production for bundled assets if needed.
export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Algorithm',
    description: 'Users going through a vetting process to ensure you never match with bots.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Matches',
    description: 'We match you with people that have a large array of similar interests.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Premium',
    description: 'Sign up today and enjoy the first month of premium benefits on us.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
  },
];
