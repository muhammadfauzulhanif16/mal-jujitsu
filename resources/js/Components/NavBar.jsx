import { ActionIcon, Flex, Text } from '@mantine/core'
import { IconClipboardText, IconHome, IconMedal, IconReport, IconReportAnalytics, IconUser } from '@tabler/icons-react'
import { router } from '@inertiajs/core'

export const NavBar = (props) => {
  const navList = [{ icon: <IconHome />, label: 'Beranda', route: 'dashboard' }, {
    icon: <IconUser />,
    label: 'Pelatih',
    route: 'coaches.index',
  }, { icon: <IconUser />, label: 'Atlet', route: 'athletes.index' }, { icon: <IconClipboardText />, label: 'Latihan', route: 'exercises.index' }, {
    icon: <IconMedal />,
    label: 'Pertandingan', route: 'tournaments.index',
  }, { icon: <IconReportAnalytics />, label: 'Penilaian', route: 'evaluations.index' }, { icon: <IconReport />, label: 'Laporan', route: 'reports.index' }]
  
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" bg="white" gap={{ base: 0, md: 32 }}>
      {navList.map((nav, id) => (
        <Flex style={{ cursor: 'pointer' }} w="100%" direction={{ base: 'row', md: 'column' }} gap={{ base: 8, md: 4 }} align="center" key={id}
              h={{ base: 48, md: 'auto' }}
              onClick={() => router.get(route(nav.route))}>
          <ActionIcon variant={props.title.split(' ')[0] === nav.label
            ? 'filled' : 'subtle'} h={32} w={48} radius="xl" color="gold.2" aria-label={nav.label}>
            {nav.icon}
          </ActionIcon>
          
          <Text size="sm" fw={props.title.split(' ')[0] === nav.label ? 'bold' : 'normal'}
                c={props.title.split(' ')[0] === nav.label ? 'neutral.0' : 'neutral.2'}>
            {nav.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  )
}
