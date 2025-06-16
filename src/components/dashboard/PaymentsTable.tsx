/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { MoreHorizontal } from 'lucide-react'; // For the ellipsis icon in the dropdown trigger
// import { cn } from '@/lib/utils'; // Assuming you have a utility for class merging
// import { getAllUsers } from '@/services/databaseService.service';
// import type { UserData } from '@/Pages/HeroSection';

// // Define the type for a payment item
// interface Payment {
//   id: string;
//   username: string;
//   status: 'pending' | 'accepted' | 'declined';
// }

// // Sample data for demonstration
// const initialPayments: Payment[] = [
//   { id: '1', username: 'alice.smith', status: 'pending' },
//   { id: '2', username: 'bob.johnson', status: 'accepted' },
//   { id: '3', username: 'charlie.brown', status: 'pending' },
//   { id: '4', username: 'diana.prince', status: 'declined' },
//   { id: '5', username: 'eve.adams', status: 'pending' },
// ];

// export function PaymentsTable() {
//   // Use useState to manage the payments data
//   const [payments, setPayments] = useState<Payment[]>(initialPayments);
//   const [data, setData] = useState<UserData[] | null>(null);

// useEffect(() => {
//     async function fetchUsers() {
//         const allUsers = await getAllUsers();
//         // If getAllUsers returns DocumentList<Document>, you may need to map it to UserData[]
//         // Example mapping (adjust fields as needed):
//         // const users: UserData[] = allUsers.map((doc: any) => ({
//         //   email: doc.email,
//         //   firstName: doc.firstName,
//         //   lastName: doc.lastName,
//         //   zipCode: doc.zipCode,
//         //   // ...other fields
//         // }));
//         // setData(users);
//         if(allUsers !=null){
//             setData(allUsers as unknown as UserData[]); // Temporary cast, replace with mapping above for type safety
//             console.log(allUsers);
//         }
//     }
//     fetchUsers();
// }, []);

//   const updatePaymentStatus = (id: string, newStatus: Payment['status']) => {
//     setPayments(prevPayments =>
//       prevPayments.map(payment =>
//         payment.id === id ? { ...payment, status: newStatus } : payment
//       )
//     );
//     // In a real application, you would also send an API request here
//     // to update the status in your backend database.
//     console.log(`Payment ID: ${id} status updated to: ${newStatus}`);
//   };

//   const handleAccept = (id: string) => {
//     updatePaymentStatus(id, 'accepted');
//   };

//   const handleDecline = (id: string) => {
//     updatePaymentStatus(id, 'declined');
//   };

//   return (
//     <div className="rounded-md border p-4 overflow-x-auto">
//       <Table className="min-w-full">
//         <TableHeader className="hidden sm:table-header-group">
//           <TableRow>
//             <TableHead className="w-[200px]">Username</TableHead>
//             <TableHead>Payment Status</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody className="block sm:table-row-group">
//           {data && data.map((payment) => (
//             <TableRow
//               key={payment?.$id}
//               className="block sm:table-row border border-gray-200 mb-4 sm:mb-0 rounded-lg shadow-sm sm:shadow-none sm:border-0"
//             >
//               <TableCell className="block sm:table-cell font-medium text-right sm:text-left relative py-3 px-4 sm:py-2">
//                 <span className="sm:hidden absolute left-4 font-bold text-gray-600">Username:</span>
//                 {payment.firstName + " " + payment.lastName}
//               </TableCell>
//               <TableCell className="block sm:table-cell text-right sm:text-left relative py-3 px-4 sm:py-2">
//                 <span className="sm:hidden absolute left-4 font-bold text-gray-600">Status:</span>
//                 <span
//                   className={cn(
//                     'px-2 py-1 rounded-full text-xs font-semibold',
//                     {
//                       'bg-orange-100 text-orange-800': payment.status === 'pending',
//                       'bg-green-100 text-green-800': payment.status === 'accepted',
//                       'bg-red-100 text-red-800': payment.status === 'declined',
//                     }
//                   )}
//                 >
//                   {payment.status
//                     ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
//                     : 'Unknown'}
//                 </span>
//               </TableCell>
//               <TableCell className="block sm:table-cell text-right relative py-3 px-4 sm:py-2">
//                 <span className="sm:hidden absolute left-4 font-bold text-gray-600">Action:</span>
//                 <div className="flex flex-col sm:flex-row justify-end items-center sm:items-stretch space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
//                   {payment.status === 'pending' && (
//                     <>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => payment.$id && handleAccept(payment.$id)}
//                         className="w-full sm:w-auto"
//                       >
//                         Accept
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => payment.$id && handleDecline(payment.$id)}
//                         className="w-full sm:w-auto"
//                       >
//                         Decline
//                       </Button>
//                     </>
//                   )}
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <span className="sr-only">Open menu</span>
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Edit Status</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem onClick={() => payment.$id && updatePaymentStatus(payment.$id, 'pending')}>
//                         Pending
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => payment.$id && updatePaymentStatus(payment.$id, 'accepted')}>
//                         Accepted
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => payment.$id && updatePaymentStatus(payment.$id, 'declined')}>
//                         Declined
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    getAllUsersWithStatus,
    updateUserStatus,
} from '@/services/databaseService.service';

interface UserData {
    $id: string;
    firstname: string;
    lastname: string;
    status: 'pending' | 'accepted' | 'declined';
}

export function PaymentsTable() {
    const [users, setUsers] = useState<UserData[]>([]);

    const fetchUsers = async () => {
        const allUsers = await getAllUsersWithStatus();
        if (Array.isArray(allUsers)) {
            const mappedUsers: UserData[] = allUsers.map((doc: any) => ({
                $id: doc.$id,
                firstname: doc.firstname,
                lastname: doc.lastname,
                status: doc.status,
            }));
            setUsers(mappedUsers);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleStatusUpdate = async (userId: string, newStatus: UserData['status']) => {
        await updateUserStatus(userId, newStatus);
        setUsers(prev =>
            prev.map(user =>
                user.$id === userId ? { ...user, status: newStatus } : user
            )
        );
    };

    return (
        <div className="rounded-md border p-4 overflow-x-auto">
            <Table className="min-w-full">
                <TableHeader className="hidden sm:table-header-group">
                    <TableRow>
                        <TableHead className="w-[200px]">Username</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="block sm:table-row-group">
                    {users.map((user) => (
                        <TableRow
                            key={user.$id}
                            className="block sm:table-row border border-gray-200 mb-4 sm:mb-0 rounded-lg shadow-sm sm:shadow-none sm:border-0"
                        >
                            <TableCell className="block sm:table-cell font-medium text-right sm:text-left relative py-3 px-4 sm:py-2">
                                <span className="sm:hidden absolute left-4 font-bold text-gray-600">Username:</span>
                                {user.firstname} {user.lastname}
                            </TableCell>
                            <TableCell className="block sm:table-cell text-right sm:text-left relative py-3 px-4 sm:py-2">
                                <span className="sm:hidden absolute left-4 font-bold text-gray-600">Status:</span>
                                <span
                                    className={cn(
                                        'px-2 py-1 rounded-full text-xs font-semibold',
                                        {
                                            'bg-orange-100 text-orange-800': user.status === 'pending',
                                            'bg-green-100 text-green-800': user.status === 'accepted',
                                            'bg-red-100 text-red-800': user.status === 'declined',
                                        }
                                    )}
                                >
                                    {/* {user.status.charAt(0).toUpperCase() + user.status.slice(1)} */}
                                    {user.status
                                        ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
                                        : 'Unknown'}

                                </span>
                            </TableCell>
                            <TableCell className="block sm:table-cell text-right relative py-3 px-4 sm:py-2">
                                <div className="flex flex-col sm:flex-row justify-end items-center sm:items-stretch space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                                    {user.status === 'pending' && (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleStatusUpdate(user.$id, 'accepted')}
                                                className="w-full sm:w-auto"
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleStatusUpdate(user.$id, 'declined')}
                                                className="w-full sm:w-auto"
                                            >
                                                Decline
                                            </Button>
                                        </>
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Edit Status</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {['pending', 'accepted', 'declined'].map((status) => (
                                                <DropdownMenuItem
                                                    key={status}
                                                    onClick={() => handleStatusUpdate(user.$id, status as UserData['status'])}
                                                >
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
