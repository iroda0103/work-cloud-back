// Docker adapter — dockerode orqali konteynerlarni boshqaradi
// O'rnatish: npm install dockerode
let Docker
try {
  Docker = require('dockerode')
} catch {
  Docker = null
}

// Har template uchun Docker image nomi
const IMAGES = {
  'ubuntu-base': 'dorowu/ubuntu-desktop-lxde-vnc',
  python:        'workcloud/python',
  nodejs:        'workcloud/nodejs',
  fullstack:     'workcloud/fullstack',
}

function getClient() {
  if (!Docker) throw new Error('dockerode o\'rnatilmagan. npm install dockerode')
  return new Docker({ socketPath: '/var/run/docker.sock' })
}

async function createAndStart({ name, image, port, limits }) {
  const docker = getClient()
  const container = await docker.createContainer({
    name,
    Image: image,
    HostConfig: {
      PortBindings: { '6901/tcp': [{ HostPort: String(port) }] },
      Memory: limits.ram_mb * 1024 * 1024,
      CpuShares: limits.cpu_shares,
      StorageOpt: {},
    },
    ExposedPorts: { '6901/tcp': {} },
  })
  await container.start()
  return container.id
}

async function start(containerName) {
  const docker = getClient()
  const container = docker.getContainer(containerName)
  await container.start()
}

async function stop(containerName) {
  const docker = getClient()
  const container = docker.getContainer(containerName)
  await container.stop()
}

async function remove(containerName) {
  const docker = getClient()
  const container = docker.getContainer(containerName)
  await container.remove({ force: true })
}

module.exports = Object.freeze({ IMAGES, createAndStart, start, stop, remove })
