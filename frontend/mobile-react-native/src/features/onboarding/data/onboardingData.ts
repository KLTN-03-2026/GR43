// Using external URLs for demonstration. Replace with require('../../../assets/...') in true production for bundled assets if needed.
export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  imageSource: any;
}

export const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Algorithm',
    description: 'Users going through a vetting process to ensure you never match with bots.',
    imageSource: require('../../../../assets/images/anh1.jpg'),
  },
  {
    id: '2',
    title: 'Matches',
    description: 'We match you with people that have a large array of similar interests.',
    imageSource: require('../../../../assets/images/anh2.jpg'),
  },
  {
    id: '3',
    title: 'Premium',
    description: 'Sign up today and enjoy the first month of premium benefits on us.',
    imageSource: require('../../../../assets/images/anh3.jpg'),
  },
];
