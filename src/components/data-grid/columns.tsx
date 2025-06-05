"use client";

import type { Trial } from "@/data/trial-store";
import { type GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

export type TrialRow = Trial & { id: number };

export function useActionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<TrialRow | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    row: TrialRow,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleCopyNCT = async (nctNumber: string) => {
    try {
      await navigator.clipboard.writeText(nctNumber);
    } catch (error) {
      console.error("Failed to copy NCT number:", error);
    }
    handleMenuClose();
  };

  return {
    anchorEl,
    selectedRow,
    handleMenuClick,
    handleMenuClose,
    handleCopyNCT,
  };
}

export const createColumns = (): GridColDef[] => {
  return [
    {
      field: "NCT Number",
      headerName: "NCT Number",
      width: 120,
      sortable: true,
    },
    {
      field: "Study Title",
      headerName: "Study Title",
      width: 250,
      sortable: true,
    },
    {
      field: "Acronym",
      headerName: "Acronym",
      width: 100,
    },
    {
      field: "Study Status",
      headerName: "Study Status",
      width: 120,
      sortable: true,
    },
    {
      field: "Brief Summary",
      headerName: "Brief Summary",
      width: 300,
    },
    {
      field: "Study Results",
      headerName: "Study Results",
      width: 120,
    },
    {
      field: "Conditions",
      headerName: "Conditions",
      width: 180,
    },
    {
      field: "Interventions",
      headerName: "Interventions",
      width: 180,
    },
    {
      field: "Primary Outcome Measures",
      headerName: "Primary Outcome Measures",
      width: 200,
    },
    {
      field: "Secondary Outcome Measures",
      headerName: "Secondary Outcome Measures",
      width: 200,
    },
    {
      field: "Other Outcome Measures",
      headerName: "Other Outcome Measures",
      width: 200,
    },
    {
      field: "Sponsor",
      headerName: "Sponsor",
      width: 150,
    },
    {
      field: "Collaborators",
      headerName: "Collaborators",
      width: 150,
    },
    {
      field: "Sex",
      headerName: "Sex",
      width: 100,
    },
    {
      field: "Age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "Phases",
      headerName: "Phases",
      width: 100,
    },
    {
      field: "Enrollment",
      headerName: "Enrollment",
      width: 120,
      type: "number",
      valueGetter: (params: { row: TrialRow }) => {
        const value = params.row?.Enrollment;
        return value ? parseInt(String(value).replace(/,/g, ""), 10) : 0;
      },
      sortable: true,
    },
    {
      field: "Funder Type",
      headerName: "Funder Type",
      width: 120,
    },
    {
      field: "Study Type",
      headerName: "Study Type",
      width: 120,
      sortable: true,
    },
    {
      field: "Study Design",
      headerName: "Study Design",
      width: 150,
    },
    {
      field: "Other IDs",
      headerName: "Other IDs",
      width: 120,
    },
    {
      field: "Start Date",
      headerName: "Start Date",
      width: 120,
      sortable: true,
    },
    {
      field: "Primary Completion Date",
      headerName: "Primary Completion Date",
      width: 150,
    },
    {
      field: "Completion Date",
      headerName: "Completion Date",
      width: 120,
      sortable: true,
    },
    {
      field: "First Posted",
      headerName: "First Posted",
      width: 120,
    },
    {
      field: "Results First Posted",
      headerName: "Results First Posted",
      width: 150,
    },
    {
      field: "Last Update Posted",
      headerName: "Last Update Posted",
      width: 150,
    },
    {
      field: "Locations",
      headerName: "Locations",
      width: 180,
    },
    {
      field: "Study Documents",
      headerName: "Study Documents",
      width: 150,
    },
  ];
};
