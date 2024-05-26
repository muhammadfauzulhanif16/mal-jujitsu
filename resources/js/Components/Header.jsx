import { ActionIcon, Avatar, Box, Button, Drawer, Flex, Group, Image, Menu, Stack, Text } from '@mantine/core'
import { IconLogout, IconMenu, IconUser, IconX } from '@tabler/icons-react'
import { NavBar } from '@/Components/NavBar.jsx'
import { useDisclosure } from '@mantine/hooks'
import { router } from '@inertiajs/core'

export const Header = (props) => {
  const [opened, { open, close }] = useDisclosure(false)
  console.log(props)
  return (
    <>
      <Flex px={16} justify="space-between" h={80} style={{ zIndex: 2, alignItems: 'center' }}>
        <Group w={240}>
          <Image radius={16} h={48} src="https://pbjisurabaya.or.id/images/logo/pbji.png" />
        </Group>
        
        <Box display={{ base: 'none', lg: 'block' }}>
          <NavBar title={props.title} />
        </Box>
        
        <Menu shadow="md"
              styles={{ dropdown: { padding: 8, borderRadius: 20 }, item: { height: 48, borderRadius: 32 }, itemSection: { marginRight: 16 } }}>
          <Menu.Target>
            <Group display={{ base: 'none', lg: 'flex' }} variant="subtle" style={{ cursor: 'pointer' }} gap={16} w={240} justify="end">
              <Box align="end" gap={0} w={160}>
                <Text truncate="end">{props.authed.full_name}</Text>
                <Text truncate="end" size="sm" c="netral.5">{props.authed.email}</Text>
              </Box>
              
              <Avatar src={props.authed.avatar} alt={props.authed.full_name} size={48}
                      color="gold.1">{!props.authed.avatar && props.authed.full_name.split(' ')[0][0]}</Avatar>
            </Group>
          </Menu.Target>
          
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUser />} px={16} py={0} color="netral">Profil Saya</Menu.Item>
            <Menu.Item leftSection={<IconLogout />} color="red" px={16} py={0} onClick={() => router.post(route('logout'))}>Keluar Akun</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        
        <ActionIcon display={{ base: 'block', lg: 'none' }} aria-label="Menu" variant="subtle" color="gold.1" size={48} radius="xl" onClick={open}>
          <IconMenu />
        </ActionIcon>
      </Flex>
      
      <Drawer title={
        <Group bg="blue">
          <Avatar src={props.authed.avatar} alt={props.authed.full_name} size={48} color="gold.1">{props.authed.full_name.split(' ')[0][0]}</Avatar>
          
          <Stack gap={0} w={160}>
            <Text truncate="end">{props.authed.full_name}</Text>
            <Text size="sm" c="netral.5" truncate="end">{props.authed.email}</Text>
          </Stack>
        </Group>
      } styles={{
        header: { height: 80, padding: 16, gap: 0 }, content: { display: 'flex', flexDirection: 'column' }, body: {
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%',
        },
      }} size={320} position="right" opened={opened} onClose={close} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} closeButtonProps={{
        style: { margin: 0, width: 48, height: 48 }, icon: <ActionIcon component="div" aria-label="Menu" variant="subtle" color="gold.1" size={48} radius="xl">
          <IconX />
        </ActionIcon>,
      }}
      >
        <NavBar title={props.title} />
        
        <Stack gap={0}>
          <Button px={16} styles={{ section: { marginRight: 16 } }} justify="start" h={48} variant="subtle" color="netral" radius={32}
                  leftSection={<IconUser />}
                  p={16}>Profil Saya</Button>
          <Button px={16} styles={{ section: { marginRight: 16 } }} justify="start" h={48} variant="subtle" color="red" radius={32} leftSection={<IconLogout />}
                  p={16}>Keluar Akun</Button>
        </Stack>
      </Drawer>
    </>
  )
}
