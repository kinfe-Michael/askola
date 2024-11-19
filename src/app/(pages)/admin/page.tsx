"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reportsAction } from "@/controllers/actions/reportAction";
import { statsData } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AdminPage() {
  const [stats, setStats] = useState<statsData | null>(null);
  const [refresh, setRefresh] = useState(false);
  const containerStyle =
    "w-2/5 m-2 p-4 bg-white rounded-md shadow-sm flex flex-col items-center justify-center border border-gray-200";
  useEffect(() => {
    reportsAction().then((data: statsData) => setStats(data));
    setRefresh(false);
  }, [refresh]);
  const linkStyle = `w-2/5  p-2 w-full   rounded-md border border-gray-200 shadow-sm font-medium  bg-white `;
  return (
    <div className="w-full  bg-gray-100 min-h-dvh flex gap-2 py-4 flex-wrap items-center  justify-start">
      
      <Table className="capitalize bg-white rounded-md m-2">
        <TableCaption>Report about users</TableCaption>
        <TableHeader>
          <TableRow className="font-medium">
            <TableCell>Total Users</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total Users</TableCell>
            <TableCell>_</TableCell>
            <TableCell>{stats?.totalUsers}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>New users</TableCell>
            <TableCell>day</TableCell>
            <TableCell>{stats?.newUsers}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Active users</TableCell>
            <TableCell>weak</TableCell>
            <TableCell>{stats?.activeUsersWeakly}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Active users</TableCell>
            <TableCell>day</TableCell>
            <TableCell>{stats?.activeUsersHourly || '_'}  </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Admins</TableCell>
            <TableCell>_</TableCell>
            <TableCell>{stats?.admins}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex gap-4 p-2 bg-white items-center w-full flex-col">
      <p className="text-lg ml-6 font-medium">Actions</p>
         
        <Link href={"/admin/add-question"} className={linkStyle}>
          Add Question
        </Link>
        <Link href={"/admin/add-course"} className={linkStyle}>
          Add Course
        </Link>
        <Link href={"/admin/add-program"} className={linkStyle}>
          Add Program
        </Link>
        <Link href={"/admin/add-task"} className={linkStyle}>
          Add Task
        </Link>
      </div>

      {/* <button
          className="border p-4 active:bg-gray-200 bg-white shadow-md rounded-md"
          onClick={() => setRefresh(true)}
        >
          Refresh
        </button> */}
    </div>
  );
}

export default AdminPage;
