import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconSearch, IconTrash, IconUsers } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'
import { router } from '@inertiajs/core'

const Index = (props) => {
  console.log(props)
  const [periodSearch, setPeriodSearch] = useState('')
  const THList = [{ title: '#' }, { title: 'Periode', key: 'period' }, { title: 'Awal Jangka Waktu', key: 'start_date' }, {
    title: 'Akhir Jangka Waktu',
    key: 'end_date',
  }, { title: 'Total Latihan', key: 'total_exercises' }, { title: 'Total Pertandingan', key: 'total_tournaments' }, { title: 'Aksi' }]
  const actionList = [
    {
      label: 'Rincian Penilaian',
      icon: <IconEye />,
      onClick: (evaluation) => router.get(route('evaluations.show', evaluation.id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Penilaian',
      icon: <IconPencil />,
      onClick: (evaluation) => router.get(route('evaluations.edit', evaluation.id)),
      color: 'yellow',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
    {
      label: 'Hapus Penilaian',
      icon: <IconTrash />,
      onClick: (evaluation) => router.delete(route('evaluations.destroy', evaluation.id)),
      color: 'red',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
  ]
  const evaluationList = props.evaluations.filter((evaluation) => {
    return evaluation.period.toString().includes(periodSearch.toString())
  })
  const [sortedData, setSortedData] = useState(evaluationList)
  const TDList = sortedData.map((evaluation, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{evaluation.period}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{new Date(evaluation.start_date).toLocaleDateString('id').split('/').join('-')}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{new Date(evaluation.end_date).toLocaleDateString('id').split('/').join('-')}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{evaluation.total_exercises}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{evaluation.total_tournaments}</MantineTable.Td>
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
  
  const handleSort = (sortedData) => {
    setSortedData(sortedData)
  }
  
  return (
    <AppLayout title={`Penilaian `} authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Penilaian', route: 'evaluations.index' }, {
            label: 'Rincian',
          }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari periode penilaian..." onChange={(e) => setPeriodSearch(e.target.value)} />
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2"
                   placeholder="Cari atlet..." onChange={(e) => setPeriodSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} icon={<IconUsers size={48} />} title="Atlet" route="evaluations.create" authed={props.auth.user}
             data={evaluationList}
             handleSort={handleSort} />
    </AppLayout>
  )
}

export default Index
