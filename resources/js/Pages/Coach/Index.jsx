import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconPlus, IconSearch, IconTrash, IconUser } from '@tabler/icons-react'
import { router } from '@inertiajs/core'
import { Table } from '@/Components/Table.jsx'
import { useState } from 'react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
// import Pusher from 'pusher-js'
//
// window.Pusher = Pusher

const Index = (props) => {
  // console.log(import.meta.env.VITE_PUSHER_APP_KEY)
  const [coachSearch, setCoachSearch] = useState('')
  const THList = ['#', 'Foto', 'Nama Lengkap', 'Peran', 'Aksi']
  const actionList = [{
    label: 'Rincian Pelatih',
    icon: <IconEye />,
    onClick: (user) => router.get(route('coaches.show', user.id)),
    color: 'blue',
  }, {
    label: 'Ubah Pelatih',
    icon: <IconPencil />,
    onClick: (user) => router.get(route('coaches.edit', user.id)),
    color: 'yellow',
    disabled: !props.auth.user.role.includes('Pelatih'),
  }, {
    label: 'Hapus Pelatih',
    icon: <IconTrash />,
    onClick: (user) => router.delete(route('coaches.destroy', user.id)),
    color: 'red',
    disabled: !props.auth.user.role.includes('Pelatih'),
  }]
  const coachList = props.coaches
    .filter((coach) => coach.user.full_name.toLowerCase().includes(coachSearch.toLowerCase()))
  const TDList = coachList.map((coach, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td px={16} py={0} style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td px={16} py={0} style={{ whiteSpace: 'nowrap' }}><Avatar src={coach.user.avatar} alt={coach.user.full_name} /></MantineTable.Td>
      <MantineTable.Td px={16} py={0} style={{ whiteSpace: 'nowrap' }}>{coach.user.full_name}</MantineTable.Td>
      <MantineTable.Td px={16} py={0} style={{ whiteSpace: 'nowrap' }}>{coach.user.role}</MantineTable.Td>
      <MantineTable.Td px={16} py={0} style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={8} style={{ whiteSpace: 'nowrap' }}>
          {actionList.map((action, id) => (
            <Tooltip label={action.label} key={id} style={{ borderRadius: 32, padding: '.5rem 1rem' }}>
              <ActionIcon size={48} radius={32} variant="subtle" aria-label={action.label} color={action.color} onClick={() => action.onClick(coach.user)}
                          disabled={props.auth.user.id === coach.user.id || action.disabled}>
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  //
  // useEffect(() => {
  //   var pusher = new Pusher('986a466c9f5c50cf5ed9', {
  //     cluster: 'ap1',
  //     encrypted: true, // Use encrypted connection
  //     forceTLS: true,
  //   })
  //
  //   var channel = pusher.subscribe('coach-created')
  //   channel.bind('App\\Events\\CoachCreated', function(data) {
  //     alert(JSON.stringify(data))
  //   })
  //
  //   return () => {
  //     channel.unbind('App\\Events\\CoachCreated')
  //     pusher.unsubscribe('coach-created')
  //   }
  // }, [])
  
  return (
    <AppLayout title="Pelatih" authed={props.auth.user} meta={props.meta} unreadHistories={props.unread_histories.length}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Pelatih', totalData: props.coaches.length }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari pelatih..." onChange={(e) => setCoachSearch(e.target.value)} />
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Pelatih">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('coaches.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('coaches.create'))}>
                  Tambah Pelatih
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2"
                   placeholder="Cari atlet..." onChange={(e) => setCoachSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} icon={<IconUser size={48} />} title="Pelatih" route="coaches.create" authed={props.auth.user} />
    </AppLayout>
  )
}

export default Index
