// add custom device detect for tablet
export default function ({ $device }) {
  const agent = $device.userAgent.toLowerCase()

  $device.customIsTablet =
    $device.isTablet ||
    agent.includes('ipad') ||
    (agent.includes('macintosh') && 'ontouchend' in document)

  $device.customIsMobileOrTablet =
    $device.isMobile ||
    $device.isTablet ||
    agent.includes('ipad') ||
    (agent.includes('macintosh') && 'ontouchend' in document)
}
