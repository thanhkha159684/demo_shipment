'use client';

import { useRouter } from 'next/navigation';

const dashboardModules = [
  {
    name: 'User Management',
    description: 'Manage system users, roles, and permissions',
    icon: '👥',
    href: '/users',
    stats: {
      total: 156,
      active: 142,
      label: 'Active Users',
    },
    color: 'bg-blue-500',
  },
  {
    name: 'Order Management',
    description: 'Track and manage customer orders and processing',
    icon: '🛒',
    href: '/orders',
    stats: {
      total: 2847,
      active: 234,
      label: 'Pending Orders',
    },
    color: 'bg-green-500',
  },
  {
    name: 'Customer Management',
    description: 'Maintain customer database and relationships',
    icon: '👤',
    href: '/customers',
    stats: {
      total: 1892,
      active: 89,
      label: 'New This Month',
    },
    color: 'bg-purple-500',
  },
  {
    name: 'Shipment Management',
    description: 'Monitor shipping status and delivery tracking',
    icon: '🚚',
    href: '/shipments',
    stats: {
      total: 1456,
      active: 67,
      label: 'In Transit',
    },
    color: 'bg-orange-500',
  },
];

export default function Home() {
  const router = useRouter();

  const handleCardClick = (href: string) => {
    router.push(href);
  };
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="lg:max-w-4xl">
        <h2 className="text-base/7 font-semibold text-indigo-600">
          Shipment Management System
        </h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          Dashboard Overview
        </p>
        <p className="mt-6 text-lg/8 text-gray-700">
          Monitor and manage your shipping operations with comprehensive tools
          for users, orders, customers, and shipments.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardModules.map(module => (
          <div
            key={module.name}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(module.href)}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center text-white text-2xl`}
              >
                {module.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {module.stats.total.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {module.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {module.stats.label}
              </span>
              <span
                className={`text-lg font-bold ${module.color.replace('bg-', 'text-')}`}
              >
                {module.stats.active}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/users')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Add New User
          </button>
          <button
            onClick={() => router.push('/orders')}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Create Order
          </button>
          <button
            onClick={() => router.push('/customers')}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Add Customer
          </button>
          <button
            onClick={() => router.push('/shipments')}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Track Shipment
          </button>
        </div>
      </div>
    </div>
  );
}
