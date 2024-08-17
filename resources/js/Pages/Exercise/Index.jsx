import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, FileButton, Flex, Group, HoverCard, Stack, Table as MantineTable, Text, TextInput, Tooltip } from '@mantine/core'
import { IconClipboardText, IconEye, IconFileSpreadsheet, IconPencil, IconPlus, IconSearch, IconTrash, IconUpload } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'
import { MS_EXCEL_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@inertiajs/react'

const Index = (props) => {
  const form = useForm({
    file: null,
  })
  
  console.log(form.data.file, 'file')
  
  const [exerciseSearch, setExerciseSearch] = useState('')
  // const THList = ['#', 'Nama', 'Tempat', 'Atlet', 'Pelatih', 'Tanggal', 'Waktu Mulai', 'Waktu Selesai', 'Aksi']
  const THList = [{ title: '#' }, { title: 'Nama', key: 'name' }, { title: 'Tempat', key: 'place' }, { title: 'Atlet' }, {
    title: 'Pelatih',
    key: 'coach.full_name',
  }, { title: 'Tanggal', key: 'date' }, { title: 'Waktu Mulai', key: 'start_time' }, { title: 'Waktu Selesai', key: 'end_time' }, { title: 'Aksi' }]
  const actionList = [
    {
      label: 'Rincian Latihan',
      icon: <IconEye />,
      onClick: (exercise) => router.get(route('exercises.show', exercise.id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Latihan',
      icon: <IconPencil />,
      onClick: (exercise) => router.get(route('exercises.edit', exercise.id)),
      color: 'yellow',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
    {
      label: 'Hapus Latihan',
      icon: <IconTrash />,
      onClick: (exercise) => router.delete(route('exercises.destroy', exercise.id)),
      color: 'red',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
  ]
  const exerciseList = props.exercises.filter((exercise) => {
    return exercise.name.toLowerCase().includes(exerciseSearch.toLowerCase())
  })
  const [sortedData, setSortedData] = useState(exerciseList)
  const TDList = sortedData.map((exercise, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        {exercise.name}
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exercise.place}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Avatar.Group spacing={24} h={48}>
          {exercise.athletes.map((athlete) => (
            <HoverCard key={athlete.id} withArrow shadow="xl">
              <HoverCard.Target>
                <Avatar size={52} src={athlete.avatar} radius={32} />
              </HoverCard.Target>
              
              <HoverCard.Dropdown style={{ borderRadius: 32 }} p={16}>
                <Group>
                  <Avatar size={80} src={athlete.avatar} radius={160} />
                  <Stack gap={5}>
                    <Text size="sm" fw={600}>
                      {athlete.full_name}
                    </Text>
                    
                    <Text size="sm" c="dimmed">
                      {athlete.role}
                    </Text>
                  </Stack>
                </Group>
              </HoverCard.Dropdown>
            </HoverCard>
          ))}
        </Avatar.Group>
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={16} align="center">
          <Avatar size={48} src={exercise.coach.avatar} />
          
          {exercise.coach.full_name} ({exercise.coach.role})
        </Flex>
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{new Date(exercise.date).toLocaleDateString('id').split('/').join('-')}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exercise.start_time.split(':').join('.')}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exercise.end_time.split(':').join('.')}</MantineTable.Td>
      <MantineTable.Td px={16} py={0} style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={8} style={{ whiteSpace: 'nowrap' }}>
          {actionList.map((action, id) => (
            <Tooltip label={action.label} key={id} style={{ borderRadius: 32, padding: '.5rem 1rem' }}>
              <ActionIcon size={48} radius={32} variant="subtle" aria-label={action.label} color={action.color}
                          onClick={() => action.onClick(exercise)}
                          disabled={action.disabled}>
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  const handleSort = (sortedData) => {
    setSortedData(sortedData)
  }
  
  return (
    <AppLayout title="Latihan" authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Latihan', totalData: props.exercises.length }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari latihan..." onChange={(e) => setExerciseSearch(e.target.value)} />
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Jadwal">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('exercises.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Unggah Jadwal">
                  <Button.Group>
                    <FileButton accept={MS_EXCEL_MIME_TYPE} onChange={
                      (file) => form.setData('file', file)
                    } style={{ borderRadius: '32px 0 0 32px' }} display={{ base: 'none', sm: 'block' }}
                                w={192}
                                leftSection={<IconFileSpreadsheet />}
                                variant="filled"
                                color="gold.2" h={48}
                                px={16}
                                styles={{ section: { marginRight: 12 } }}>
                      {(props) => <Button {...props}>{form.data.file ? form.data.file.name : 'Unggah Jadwal'}</Button>}
                    </FileButton>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      form.post(route('exercises.schedule.store'))
                    }}>
                      <ActionIcon type="submit" disabled={!form.data.file} style={{ borderRadius: '0 32px 32px 0' }} h={48} w={48} color="gold.2"
                                  display={{ base: 'none', sm: 'block' }}>
                        <IconUpload />
                      </ActionIcon>
                    </form>
                  </Button.Group>
                </Tooltip>
                
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Hasil">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('exercises.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('exercises.create'))}>
                  Tambah Hasil
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2"
                   placeholder="Cari atlet..." onChange={(e) => setExerciseSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} icon={<IconClipboardText size={48} />} title="Latihan" route="exercises.create" authed={props.auth.user}
             data={exerciseList}
             handleSort={handleSort} />
    </AppLayout>
  )
}

export default Index
