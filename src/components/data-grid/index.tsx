"use client"

import type { Trial } from "@/lib/load-csv";
import { api } from "@/trpc/react";
import { DataGrid, type GridPaginationModel, type GridSortModel } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useTrial } from '../../context/trial-context';
import { createColumns, useActionsMenu, type TrialRow } from './columns';
import { useDebounce } from "@/lib/hooks/use-debounce";
import { Input } from "../ui/input";

type SortableField = 'NCT Number' | 'Study Title' | 'Study Status' | 'Conditions' | 
  'Sponsor' | 'Study Type' | 'Start Date' | 'Completion Date';

export function TrialsDataGrid() {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 50,
  });
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText, 300);
  const { setSelectedTrial } = useTrial();

  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'NCT Number', sort: 'asc' },
  ]);

  const { data, isLoading } = api.trial.list.useQuery({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortField: (sortModel[0]?.field ?? 'NCT Number') as SortableField,
    sortDirection: sortModel[0]?.sort ?? 'asc',
    searchText: debouncedSearchText || undefined,
  });

  useEffect(() => {
    if (data?.pagination.totalItems) {
      setTotalItems(data.pagination.totalItems);
    }
  }, [data?.pagination.totalItems]);

  useEffect(() => {
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  }, [debouncedSearchText]);

  const menuHandlers = useActionsMenu();
  const columns = createColumns(menuHandlers);

  const rows: TrialRow[] = (data?.items ?? []).map((row: Trial, index: number) => ({ 
    ...row, 
    id: index + (paginationModel.page * paginationModel.pageSize) 
  }));

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2">
        <Input
          placeholder="Search trials..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          rowCount={totalItems}
          loading={isLoading}
          pageSizeOptions={[10, 25, 50, 100]}
          paginationMode="server"
          sortingMode="server"
          onRowClick={(params) => {
            const trial = params.row as Trial;
            setSelectedTrial(trial);
          }}
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
          }}
        />
    </div>
  );
}

