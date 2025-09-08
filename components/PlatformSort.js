'use client'

export default function PlatformSort({ sortOrder, onSortChange }) {
  return (
    // showing the games according to the sorting of the platforms
    <select
      value={sortOrder}
      onChange={(e) => onSortChange(e.target.value)}
      className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
    >
      <option value="default">Default Order</option>
      <option value="asc">Platform A → Z</option>
      <option value="desc">Platform Z → A</option>
    </select>
  )
}
