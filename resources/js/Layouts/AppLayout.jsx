import { Head } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { Flex } from '@mantine/core'
import { Header } from '@/Components/Header.jsx'
import { notifications } from '@mantine/notifications'

export const AppLayout = (props) => {
  useEffect(() => {
    if (props.meta) {
      notifications.show({
        title: props.meta.title,
        message: props.meta.message,
        color: props.meta.status ? 'green' : 'red',
        autoClose: 2000,
        withBorder: true,
      })
    }
  }, [props.meta])
  
  return (
    <Flex
      mih="100vh"
      direction="column"
    >
      <Head title={props.title} />
      
      {props.authed && <Header authed={props.authed} title={props.title} />}
      
      {props.children}
    </Flex>
  )
}
