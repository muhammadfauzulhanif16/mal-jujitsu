import { Head } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { Box, Flex } from '@mantine/core'
import { Header } from '@/Components/Header.jsx'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

export const AppLayout = (props) => {
  useEffect(() => {
    if (props.meta) {
      notifications.show({
        title: props.meta.title,
        message: props.meta.message,
        color: props.meta.status ? 'green' : 'red',
        autoClose: 2000,
        style: {
          borderRadius: 20,
        },
        styles: {
          root: {
            padding: 20,
          },
        },
        icon: props.meta.status ? <IconCheck /> : <IconX />,
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
      
      <Box
        mih="100vh"
        bg="gold.10"
        px={props.authed && {
          base: 16,
          sm: 32,
          md: 48,
          lg: 64,
        }}
        py={props.authed && 32}
      >
        {props.children}
      </Box>
    </Flex>
  )
}
