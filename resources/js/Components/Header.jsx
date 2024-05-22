import {
  ActionIcon,
  Avatar,
  Box,
  Drawer,
  Flex,
  Group,
  Menu,
  Stack,
  Text,
} from '@mantine/core'
import {
  IconLogout,
  IconMenu,
  IconOlympics,
  IconUser,
  IconX,
} from '@tabler/icons-react'
import { NavBar } from '@/Components/NavBar.jsx'
import { useDisclosure } from '@mantine/hooks'
import { router } from '@inertiajs/core'

export const Header = (props) => {
  const [opened, { open, close }] = useDisclosure(false)
  
  return (
    <>
      <Flex
        px={16}
        h={80}
        justify="space-between"
        style={{
          zIndex: 1,
          borderBottom: '1px solid #dcdcdc',
        }}
        pos="sticky"
        top={0}
        bg="netral.10"
      >
        <Flex w={160} align="center">
          <IconOlympics size={48} />
        </Flex>
        
        <Box
          display={{
            base: 'none',
            md: 'flex',
          }}
        >
          <NavBar title={props.title} />
        </Box>
        
        <Menu shadow="md" width={200}
              styles={{
                dropdown: {
                  padding: 8,
                  borderRadius: 16,
                },
                item: {
                  height: 48,
                  borderRadius: 16,
                },
              }}>
          <Menu.Target>
            <Flex
              style={{
                cursor: 'pointer',
              }}
              justify="end"
              gap={16}
              align="center"
              w={160}
              display={{
                base: 'none',
                md: 'flex',
              }}
            >
              <Stack align="end" gap={0}>
                <Text>{props.authed.full_name}</Text>
                <Text size="sm" c="netral.5">
                  {props.authed.email}
                </Text>
              </Stack>
              
              <Avatar alt={props.authed.full_name} size={48}
                      color="gold.1">{props.authed.full_name.split(' ')[0][0]}</Avatar>
            </Flex>
          </Menu.Target>
          
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUser />} p={16}>
              Profil Saya
            </Menu.Item>
            <Menu.Item leftSection={<IconLogout />} color="red" p={16}
                       onClick={() => router.post(route('logout'))}>
              Keluar Akun
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        
        <Flex w={160} align="center" justify="end" display={{
          base: 'flex',
          md: 'none',
        }}>
          <ActionIcon
            aria-label="Menu"
            variant="subtle"
            color="gold.1"
            size={48}
            radius="xl"
            onClick={open}
          >
            <IconMenu />
          </ActionIcon>
        </Flex>
      </Flex>
      
      <Drawer
        title={
          <Group>
            <Avatar alt={props.authed.full_name} size={48}
                    color="gold.1">{props.authed.full_name.split(' ')[0][0]}</Avatar>
            
            <Stack gap={0}>
              <Text truncate="end">{props.authed.full_name}</Text>
              <Text size="sm" c="netral.5" truncate="end">
                {props.authed.email}
              </Text>
            </Stack>
          </Group>
        }
        styles={{
          header: {
            height: 80,
            padding: 16,
            gap: 0,
          },
        }}
        size={240}
        position="right"
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        closeButtonProps={{
          style: {
            margin: 0,
            width: 48,
            height: 48,
          },
          icon:
            <ActionIcon
              aria-label="Menu"
              variant="subtle"
              color="gold.1"
              size={48}
              radius="xl"
            >
              <IconX />
            </ActionIcon>
          ,
        }}
      >
        <NavBar title={props.title} />
      </Drawer>
    </>
  )
}
