import ecommerceImage from '../assets/ecommerce-dashboard.png'
import inventoryImage from '../assets/inventory-dashboard.png'
import healthcareImage from '../assets/healthcare-dashboard.png'

export const projects = [
  {
    title: 'E-Commerce Platform',
    image: ecommerceImage,
    tech: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
    features: [
      'User Authentication', 'Shopping Cart', 'Order Management',
      'Product Management', 'Admin Dashboard', 'REST APIs', 'Responsive Design',
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Inventory & Order Management System (Mini ERP)',
    image: inventoryImage,
    tech: ['Java', 'Spring Boot', 'React', 'MySQL'],
    features: [
      'Inventory Management', 'Stock Tracking', 'Purchase Orders', 'Sales Orders',
      'Customer Management', 'Supplier Management', 'Invoice Generation',
      'Analytics Dashboard', 'Low Stock Alerts', 'JWT Authentication', 'Role-Based Access',
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Hospital Appointment Scheduling System',
    image: healthcareImage,
    tech: ['Java', 'Spring Boot', 'React', 'MySQL'],
    features: [
      'Patient Registration', 'Doctor Management', 'Appointment Booking',
      'Appointment Rescheduling', 'Appointment Cancellation', 'Medical Records',
      'Admin Dashboard', 'Notifications', 'Secure Login',
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'Bank Management System',
    tech: ['Java', 'Spring Boot', 'MySQL'],
    features: [
      'Customer Accounts', 'Deposits', 'Withdrawals', 'Fund Transfers',
      'Transaction History', 'REST APIs', 'Authentication',
    ],
    github: '#',
    demo: '#',
  },
  {
    title: 'URL Shortener',
    tech: ['Java', 'Spring Boot', 'React', 'MySQL'],
    features: ['Generate Short URLs', 'Analytics', 'Click Tracking', 'QR Code', 'Custom URLs'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Quiz Application',
    tech: ['Java', 'Spring Boot', 'React'],
    features: [
      'Question Management', 'Quiz Timer', 'Score Calculation',
      'Leaderboard', 'Admin Dashboard',
    ],
    github: '#',
    demo: '#',
  },
]
