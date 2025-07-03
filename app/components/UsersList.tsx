'use client'
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useThunk from '../hooks/use-thunk';
import { addUser, fetchUsers } from '../store';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem';


export default function UsersList() {

  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state: any) => {
    return state.users;
  })

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);


  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className={"w-[95%] h-10 m-auto"} />
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>
  } else {
    content = data?.map((user: any, index: number) => {
      return <UsersListItem key={user?.id ? user?.id : index} user={user} />
    })
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>
  }

  const handleUserAdd = () => {
    doCreateUser();
  }


  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button onClick={handleUserAdd}
          loading={isCreatingUser === null || typeof isCreatingUser === 'function' ? false : isCreatingUser}
          disabled={isCreatingUser === null || typeof isCreatingUser === 'function' ? false : isCreatingUser}
        >
          + Add User
        </Button>
      </div>
      {content}
    </div>
  )
}