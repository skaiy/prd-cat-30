// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
// @ts-ignore;
import { Input, Button } from '@/components/ui';

export function DataTable({
  columns,
  data,
  onRowClick,
  searchPlaceholder = "搜索...",
  showPagination = true
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const filteredData = data.filter(item => Object.values(item).some(value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())));
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder={searchPlaceholder} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  {columns.map(col => <th key={col.key} className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                      {col.title}
                    </th>)}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick?.(row)}>
                    {columns.map(col => <td key={col.key} className="py-3 px-4 text-sm text-gray-700">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>)}
                  </tr>)}
              </tbody>
            </table>
          </div>

          {showPagination && totalPages > 1 && <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                显示 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} 条，共 {filteredData.length} 条
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 px-2">
                  {currentPage} / {totalPages}
                </span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>}
        </div>;
}