import React from "react";
interface WorkFlowTableProps {
    headers: string[];
    rows: any[];
}

export const WorkFlowTable: React.FC<WorkFlowTableProps> = ({
    headers,
    rows,
}) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header} scope="col">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        // eslint-disable-next-line react/no-array-index-key
                        rows.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell: any, i: number) => (
                                    <td key={i}>{cell}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
