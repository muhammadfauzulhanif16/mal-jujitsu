import { ActionIcon, Avatar, Badge, Box, Button, Drawer, Flex, Group, Image, Menu, Stack, Text } from '@mantine/core'
import { IconBell, IconLogout, IconMenu, IconUser, IconX } from '@tabler/icons-react'
import { NavBar } from '@/Components/NavBar.jsx'
import { useDisclosure } from '@mantine/hooks'
import { router } from '@inertiajs/core'

export const Header = (props) => {
  const [opened, { open, close }] = useDisclosure(false)
  
  return (
    <>
      <Flex px={16} pos="sticky" top={0} bg="white" justify="space-between" h={80} style={{
        zIndex: 2,
        alignItems: 'center', borderBottom: '1px solid #f3f3f3',
      }}>
        <Group w={240}>
          <Image radius={32} h={48} src="https://pbjisurabaya.or.id/images/logo/pbji.png" />
        </Group>
        
        <Box display={{ base: 'none', md: 'block' }}>
          <NavBar title={props.title} />
        </Box>
        
        <Menu shadow="xl"
              styles={{ dropdown: { padding: 8, borderRadius: 32, width: 240 }, item: { height: 48, borderRadius: 32 }, itemSection: { marginRight: 16 } }}>
          <Menu.Target>
            <Group display={{ base: 'none', md: 'flex' }} variant="subtle" style={{ cursor: 'pointer' }} gap={16} w={240} justify="end">
              <Box align="end" gap={0} w={120}>
                <Text truncate="end">{props.authed.full_name}</Text>
                <Badge variant="transparent" px={0} py={0} color="gold.2" size={12} radius={0}>{props.authed.role}</Badge>
              </Box>
              
              <Avatar src={props.authed.avatar} alt={props.authed.full_name} size={48}
                      color="gold.2" />
            </Group>
          </Menu.Target>
          
          <Menu.Dropdown>
            <Button w="100%" px={16} onClick={() => router.get(route('histories.index'))} styles={{ section: { marginRight: 16 } }}
                    justify="start" h={48} fw={400}
                    variant="subtle" color="netral" radius={32}
                    leftSection={<IconBell />}
                    rightSection={props.unreadHistories > 0 ? <Badge variant="filled" color="red" circle>{props.unreadHistories}</Badge> : null}
                    p={16}>Notifikasi</Button>
            <Button w="100%" px={16} onClick={() => router.get(route('profile.edit'))} styles={{ section: { marginRight: 16 } }} justify="start" h={48} fw={400}
                    variant="subtle" color="netral" radius={32}
                    leftSection={<IconUser />}
                    p={16}>Profil Saya</Button>
            <Button w="100%" px={16} onClick={() => router.post(route('logout'))} styles={{ section: { marginRight: 16 } }} justify="start" h={48} fw={400}
                    variant="subtle" color="red" radius={32}
                    leftSection={<IconLogout />}
                    p={16}>Keluar Akun</Button>
          </Menu.Dropdown>
        </Menu>
        
        <ActionIcon display={{ base: 'block', md: 'none' }} aria-label="Menu" variant="subtle" color="gold.2" size={48} radius="xl" onClick={open}>
          <IconMenu />
        </ActionIcon>
      </Flex>
      
      <Drawer title={
        <Flex gap={16}>
          <Avatar src={props.authed.avatar} alt={props.authed.full_name} size={48}
                  color="gold.2" />
          
          <Stack gap={0} w={160} justify="space-between">
            <Text truncate="end">{props.authed.full_name}</Text>
            <Badge variant="transparent" px={0} py={0} color="gold.2" size={12} radius={0}>{props.authed.role}</Badge>
          </Stack>
        </Flex>
      } styles={{
        header: { height: 87, padding: 16, gap: 0 }, content: { display: 'flex', flexDirection: 'column' }, body: {
          zIndex: 203,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%',
        },
      }} size={320} position="right" opened={opened} onClose={close} closeButtonProps={{
        style: { margin: 0, width: 48, height: 48 }, icon: <ActionIcon component="div" aria-label="Menu" variant="subtle" color="gold.2" size={48} radius="xl">
          <IconX />
        </ActionIcon>,
      }}>
        <NavBar title={props.title} />
        
        <Stack gap={0}>
          <Button px={16} onClick={() => router.get(route('histories.index'))} styles={{ section: { marginRight: 16 } }}
                  justify="start" h={48} fw={400}
                  variant="subtle" color="netral" radius={32}
                  leftSection={<IconBell />}
                  rightSection={props.unreadHistories > 0 ? <Badge variant="filled" color="red" circle>{props.unreadHistories}</Badge> : null}
                  p={16}>Notifikasi</Button>
          <Button px={16} onClick={() => router.get(route('profile.edit'))} styles={{ section: { marginRight: 16 } }} justify="start" h={48} fw={400}
                  variant="subtle" color="netral" radius={32}
                  leftSection={<IconUser />}
                  p={16}>Profil Saya</Button>
          <Button px={16} onClick={() => router.post(route('logout'))} styles={{ section: { marginRight: 16 } }} justify="start" h={48} fw={400}
                  variant="subtle" color="red" radius={32}
                  leftSection={<IconLogout />}
                  p={16}>Keluar Akun</Button>
        </Stack>
      </Drawer>
    </>
  )
}
