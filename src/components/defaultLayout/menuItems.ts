import { ISidebarMenuItem } from '../../interfaces/sidebar';

export const SIDEBAR_MENU_ITEMS: ISidebarMenuItem[] = [
  {
    id: 'generalDashboard',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'General Dashboard',
    target: '/',
    icon: 'PieChartOutlined',
  },
  {
    id: 'reportingReports',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Reporting Reports',
    target: '/reports/reporting-report',
    icon: 'LineChartOutlined',
  },
  {
    id: 'reports',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Reports',
    target: '/reports/reports',
    icon: 'BarChartOutlined',
  },
  {
    id: 'suppliersGroup',
    title: 'All Suppliers',
    icon: 'DeploymentUnitOutlined',
    itemType: 'group',
    childItems: [
      {
        id: 'institutions',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'All Institutions',
        target: '/institutions',
        icon: 'DollarCircleOutlined',
      },
      {
        id: 'accommodations',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Accommodations',
        target: '/accommodations',
        icon: 'CopyOutlined',
      },
      {
        id: 'bookStores',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Book Stores',
        target: '/bookstores',
        icon: 'BookOutlined',
      },
    ],
  },
  {
    id: 'referrals',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'All Referrals',
    target: '/referrals',
    icon: 'DragOutlined',
  },
  {
    id: 'applications',
    title: 'All Applications',
    icon: 'ExperimentOutlined',
    itemType: 'group',
    childItems: [
      {
        id: 'applications-all',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'All Applications',
        target: '/applications/all',
        icon: 'ExperimentOutlined',
      },
      {
        id: 'applications-pre-dg',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Applications (Due for DG)',
        target: '/applications/pre-dg',
        icon: 'ExperimentOutlined',
      },
      {
        id: 'applications-post-dg',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Applications (DG Results)',
        target: '/applications/post-dg',
        icon: 'ExperimentOutlined',
      },
      {
        id: 'applications-quality-assurance',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Applications (Quality Assurance)',
        target: '/applications/quality-assurance',
        icon: 'ExperimentOutlined',
      },
    ],
  },
  {
    id: 'orientations',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Student Orientations',
    target: '/orientations',
    icon: 'PlayCircleOutlined',
  },
  {
    id: 'students',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'All Students',
    target: '/students',
    icon: 'BankOutlined',
  },
  {
    id: 'documents',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Document Management',
    target: '/documents',
    icon: 'BookOutlined',
  },
  {
    id: 'documents',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Document Management',
    target: '/document-management',
    icon: 'FileOutlined',
    requiredPermissions: ['pages:documentRegistration'],
  },
  {
    id: 'paymentPackGroup',
    title: 'Payment Packs',
    icon: 'MoneyCollectOutlined',
    itemType: 'group',
    childItems: [
      {
        id: 'invoiceAllocations',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Invoice Allocations',
        target: '/payment-packs/invoice-allocations',
        icon: 'FileDoneOutlined',
      },
      {
        id: 'workflowInbox',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Workflow Inbox',
        target: '/payment-packs/workflow-inbox',
        icon: 'AlertOutlined',
      },
      {
        id: 'paymentPackOverview',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Overview',
        target: '/payment-packs/overview',
        icon: 'UnorderedListOutlined',
      },
    ],
  },
  {
    id: 'communications',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'All Communications',
    target: '/communications',
    icon: 'CommentOutlined',
  },
  {
    id: 'monitoringPerformance',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Monitoring Tracking',
    target: '/monitoring-performance',
    icon: 'EyeOutlined',
  },
  {
    id: 'scheduleVisits',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Scheduled Visits',
    target: '/scheduled-visits',
    icon: 'CalendarOutlined',
  },
  {
    id: 'administrationGroup',
    title: 'Administration',
    icon: 'AppstoreOutlined',
    itemType: 'group',
    childItems: [
      {
        id: 'users',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'User Management',
        target: '/administration/user-management',
        icon: 'UserOutlined',
        requiredPermissions: ['pages:persons'],
      },
      {
        id: 'roles',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Roles',
        target: '/administration/roles',
        icon: 'ApartmentOutlined',
        requiredPermissions: ['pages:shaRoles'],
      },
      {
        id: 'postalCodes',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Postal Codes',
        target: '/administration/postal-codes',
        icon: 'NumberOutlined',
        requiredPermissions: ['pages:postalCodes'],
      },
      {
        id: 'postalTowns',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Postal Towns',
        target: '/administration/postal-towns',
        icon: 'EnvironmentOutlined',
        requiredPermissions: ['pages:postalTowns'],
      },
    ],
  },
  {
    id: 'configuratyionGroup',
    title: 'Configuration',
    icon: 'DeploymentUnitOutlined',
    isHidden: true,
    itemType: 'group',
    childItems: [
      {
        id: 'users',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'User Management',
        target: '/administration/user-management',
        icon: 'UserOutlined',
        requiredPermissions: ['pages:persons'],
      },
    ],
  },
  {
    id: 'maintenance',
    itemType: 'button',
    buttonAction: 'navigate',
    title: 'Maintenance',
    target: '/maintenance',
    icon: 'ToolOutlined',
    requiredPermissions: ['pages:maintenance'],
    isHidden: true,
  },
  {
    id: 'configurationGroup',
    title: 'Configuration',
    icon: 'SettingOutlined',
    itemType: 'group',
    childItems: [
      {
        id: 'settingsGroup',
        title: 'Settings',
        icon: 'SettingOutlined',
        itemType: 'group',
        childItems: [
          {
            id: 'bursaryApplications',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Bursary Applications',
            target: '/settings/bursary-applications',
            icon: 'AuditOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'Logon',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Logon',
            target: '/settings/logon',
            icon: 'LoginOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'security',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Security',
            target: '/settings/security',
            icon: 'SafetyOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'otp',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'One-Time-Pins',
            target: '/settings/otp',
            icon: 'ClockCircleOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'otp2',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'One-Time-Pins',
            target: '/settings/otp',
            icon: 'ClockCircleOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'mobileDevices',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Mobile Devices',
            target: '/settings/mobile-devices',
            icon: 'MobileOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'email',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Email',
            target: '/settings/email',
            icon: 'MailOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'sms',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'SMS',
            target: '/settings/sms',
            icon: 'MessageOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'push',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Push',
            target: '/settings/push-notifications',
            icon: 'NotificationOutlined',
            requiredPermissions: ['app:Configurator'],
          },
        ],
      },
      {
        id: 'auditGroup',
        title: 'Audit',
        icon: 'AuditOutlined',
        itemType: 'group',
        childItems: [
          {
            id: 'logon-audit',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Logon',
            target: '/settings/logon-audit',
            icon: 'LoginOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'otp-audit',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'One-Time-Pins',
            target: '/settings/otp-audit',
            icon: 'ClockCircleOutlined',
            requiredPermissions: ['app:Configurator'],
          },
          {
            id: 'notifications-audit',
            itemType: 'button',
            buttonAction: 'navigate',
            title: 'Notifications',
            target: '/settings/notification-messages',
            icon: 'BulbOutlined',
            requiredPermissions: ['app:Configurator'],
          },
        ],
      },
      {
        id: 'notifications',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Notifications',
        target: '/settings/notifications',
        icon: 'BulbOutlined',
        requiredPermissions: ['app:Configurator'],
      },
      {
        id: 'scheduledJobs',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Scheduled Jobs',
        target: '/settings/scheduled-jobs',
        icon: 'ScheduleOutlined',
        requiredPermissions: ['app:Configurator'],
      },
      {
        id: 'scheduledJobExecutions',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Scheduled Job Execution',
        target: '/settings/scheduled-job-execution',
        icon: 'ScheduleOutlined',
        requiredPermissions: ['app:Configurator'],
      },
      {
        id: 'referenceLists',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Reference Lists',
        target: '/settings/reference-lists',
        icon: 'UnorderedListOutlined',
        requiredPermissions: ['app:Configurator'],
      },
      {
        id: 'check-lists',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Check Lists',
        target: '/settings/check-lists',
        icon: 'ProfileOutlined',
        requiredPermissions: ['app:Configurator'],
      },
      {
        id: 'Forms',
        itemType: 'button',
        buttonAction: 'navigate',
        title: 'Forms',
        target: '/settings/forms',
        icon: 'BlockOutlined',
        requiredPermissions: ['app:Configurator'],
      },
    ],
  },
];
