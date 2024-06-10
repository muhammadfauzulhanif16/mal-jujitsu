import { Head } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { ActionIcon, Box, Flex } from '@mantine/core'
import { Header } from '@/Components/Header.jsx'
import { notifications } from '@mantine/notifications'
import { IconArrowNarrowUp, IconCheck, IconX } from '@tabler/icons-react'

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
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > window.innerHeight) {
        setShowScrollTop(true)
      } else if (showScrollTop && window.pageYOffset <= window.innerHeight) {
        setShowScrollTop(false)
      }
    }
    
    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [showScrollTop])
  
  return (
    <Flex
      mih="100vh"
      direction="column"
    >
      <Head title={props.title} />
      
      {props.authed && <Header authed={props.authed} title={props.title} />}
      
      <Box
        mih="100vh"
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
      
      {showScrollTop && (
        <ActionIcon onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        } pos="fixed" h={48} w={48} color="gold.1" radius={32} m={16} bottom={0} right={0} variant="light" aria-label="Settings">
          <IconArrowNarrowUp />
        </ActionIcon>
      )}
    </Flex>
  )
}
