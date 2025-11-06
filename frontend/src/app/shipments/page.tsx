'use client';

export default function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Shipment Management
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Monitor shipping status and delivery tracking
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">🚚</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-500">
          Shipment management features will be available soon.
        </p>
      </div>
    </div>
  );
}
