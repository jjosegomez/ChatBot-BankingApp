// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'appointment history',
    path: '/dashboard/appointmenthistory',
    icon: icon('ic_blog'),
  },
  {
    title: 'book an appointment',
    path: '/dashboard/bookappointment',
    icon: icon('ic_cart'),
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: icon('ic_user'),
  },
];

export default navConfig;
