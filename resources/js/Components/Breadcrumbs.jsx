import { ActionIcon, Anchor, Badge, Breadcrumbs as MantineBreadcrumbs, Group, Title } from '@mantine/core'
import { router } from '@inertiajs/core'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

export const Breadcrumbs = (props) => {
  return (
    <Group>
      {props.navList[0].route && (
        <ActionIcon h={48} w={48} color="gold.1" radius={32} variant="light"
                    onClick={() => router.get(route(props.navList[0].route))}>
          <IconArrowNarrowLeft />
        </ActionIcon>
      )}
      
      <MantineBreadcrumbs>
        {props.navList.map((nav, id) => (
          <Group key={id} onClick={() => router.get(route(nav.route, nav.data))}>
            <Anchor underline="hover" c="neutral.0">
              <Title style={{ cursor: 'pointer' }} order={id === 0 ? 1 : 4}>
                {nav.label}
              </Title>
            </Anchor>
            
            {nav.totalData && <Badge variant="light" color="gold.2" size={34} w={48} fz={16} circle>{nav.totalData}</Badge>}
          </Group>
        ))}
      </MantineBreadcrumbs>
    </Group>
  )
}
