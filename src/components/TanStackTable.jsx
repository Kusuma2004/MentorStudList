import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { USERS } from "../data";
  import { useState } from "react";
  import DownloadBtn from "./DownloadBtn";
  import DebouncedInput from "./DebouncedInput";
  import { SearchIcon } from "../Icons/Icons";
  import UserDetailModal from "./UserDetailModal"; // Import the modal component
  
  const TanStackTable = () => {
    const columnHelper = createColumnHelper();
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const columns = [
      columnHelper.accessor("", {
        id: "S.No",
        cell: (info) => <span>{info.row.index + 1}</span>,
        header: "S.No",
      }),
      columnHelper.accessor("profile", {
        cell: (info) => (
          <img
            src={info?.getValue()}
            alt="Profile"
            className="rounded-full w-12 h-12 object-cover border-2 border-gray-600 shadow-md"
          />
        ),
        header: "Profile",
      }),
      columnHelper.accessor("userName", {
        cell: (info) => (
          <a
            href="#"
            className="text-indigo-400 underline hover:text-indigo-600"
            onClick={() => {
              setSelectedUser(info.row.original);
              setIsModalOpen(true);
            }}
          >
            {info.getValue()}
          </a>
        ),
        header: "User Name",
      }),
      columnHelper.accessor("progress", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: "Progress",
      }),
    ];
  
    const [data] = useState(() => [...USERS]);
    const [globalFilter, setGlobalFilter] = useState("");
  
    const table = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
    return (
      <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100 rounded-lg shadow-2xl backdrop-blur-lg">
        <div className="flex justify-between mb-4">
          <div className="w-full flex items-center gap-2">
            <SearchIcon />
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 bg-gray-800 text-white border-b-2 border-indigo-500 rounded-lg focus:border-indigo-300 transition duration-300"
              placeholder="Search all columns..."
            />
          </div>
          <DownloadBtn data={data} fileName={"peoples"} />
        </div>
        <table className="border border-gray-700 w-full text-left rounded-lg shadow-md bg-gray-800">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 font-medium text-sm">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition-transform transform duration-300 hover:scale-105 rounded-lg`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={columns.length} className="text-gray-400">
                  No Record Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 gap-4 text-gray-300">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-full border border-gray-600 bg-gray-700 hover:bg-gray-600 shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-30"
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-full border border-gray-600 bg-gray-700 hover:bg-gray-600 shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-30"
          >
            {">"}
          </button>
  
          <span className="flex items-center gap-3 text-sm">
            <div>Page</div>
            <strong className="text-indigo-400">
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
  
          <span className="flex items-center gap-3 text-sm">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border border-gray-600 bg-gray-700 rounded-lg p-1 w-16 text-center text-gray-100 shadow-md"
            />
          </span>
  
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm text-gray-100 shadow-lg"
          >
            {[10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
  
        {/* User Detail Modal */}
        <UserDetailModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  };
  
  export default TanStackTable;
  