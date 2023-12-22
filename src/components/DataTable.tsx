import { FC } from "react";
import Link from "next/link";
import { DataTableInterface } from "@/interfaces/DataTableProps";
import {
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { BsPencilSquare } from "react-icons/bs";
import ModalDelete from "./ModalDelete";
const DataTable: FC<DataTableInterface> = ({ headerData, bodyData }) => {
  return (
    <Table isHeaderSticky removeWrapper aria-label="Data table">
      <TableHeader>
        {headerData.map((header) => (
          <TableColumn className="capitalize" key={header}>
            {header}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {bodyData.map((body) => (
          <TableRow key={body?.id}>
            <TableCell>{body?.id}</TableCell>
            <TableCell>
              <Image
                width={100}
                alt={body?.title}
                src={body?.image ? body.image : "/images/posts/default.jpg"}
              />
            </TableCell>
            <TableCell>{body?.title}</TableCell>
            <TableCell>{body?.category}</TableCell>
            <TableCell>{body?.date.substring(0, 10)}</TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip color="primary" content="Edit Post">
                  <Link href={`admin/posts/update/${body?.id}`}>
                    <span className="text-lg text-primary cursor-pointer active:opacity-50">
                      <BsPencilSquare />
                    </span>
                  </Link>
                </Tooltip>
                <ModalDelete id={body?.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
