import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Flex, Group, HoverCard, Stack, Table as MantineTable, Text, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPlus, IconReportAnalytics, IconSearch } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  const [evaluationSearch, setExerciseEvaluationSearch] = useState('')
  const THList = ['#', 'Nama Latihan', 'Tempat', 'Tanggal', 'Waktu Mulai', 'Waktu Selesai', 'Atlet', 'Aksi']
  const actionList = [
    {
      label: 'Daftar Atlet',
      icon: <IconEye />,
      onClick: (evaluation) => router.get(route('evaluations.users.index', evaluation)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    // {
    //   label: 'Ubah Penilaian',
    //   icon: <IconPencil />,
    //   onClick: (evaluation) => router.get(route('evaluations.edit', evaluation)),
    //   color: 'yellow',
    //   disabled: !props.auth.user.role.includes('Pelatih'),
    // },
    // {
    //   label: 'Hapus Penilaian',
    //   icon: <IconTrash />,
    //   onClick: (evaluation) => router.delete(route('evaluations.destroy', evaluation)),
    //   color: 'red',
    //   disabled: !props.auth.user.role.includes('Pelatih'),
    // },
  ]
  const evaluationList = props.evaluations.filter((evaluation) => {
    return evaluation.name.toLowerCase().includes(evaluationSearch.toLowerCase())
  })
  const TDList = evaluationList.map((evaluation, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{evaluation.name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{evaluation.place}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{new Date(evaluation.date).toLocaleDateString('id').split('/').join('-')}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{evaluation.start_time.split(':').join('.')}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{evaluation.end_time.split(':').join('.')}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Avatar.Group spacing={24} h={48}>
          {evaluation.athletes.map((athlete) => (
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
        <Flex gap={8} style={{ whiteSpace: 'nowrap' }}>
          {actionList.map((action, id) => (
            <Tooltip label={action.label} key={id} style={{
              borderRadius: 32,
              padding: '.5rem 1rem',
            }}>
              <ActionIcon size={48} radius={32} variant="subtle"
                          aria-label={action.label} color={action.color}
                          onClick={() => action.onClick(evaluation)}
                          disabled={action.disabled}
              >
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  return (
    <AppLayout title="Penilaian" authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Penilaian', totalData: props.evaluations.length }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari latihan..." onChange={(e) => setExerciseEvaluationSearch(e.target.value)} />
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Penilaian">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('evaluations.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('evaluations.create'))}>
                  Tambah Penilaian
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2"
                   placeholder="Cari atlet..." onChange={(e) => evaluationSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} icon={<IconReportAnalytics size={48} />} title="Penilaian" route="evaluations.create" authed={props.auth.user} />
    </AppLayout>
  )
}

export default Index
