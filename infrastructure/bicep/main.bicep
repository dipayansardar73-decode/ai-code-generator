param location str = resourceGroup().location
param applicationName str = 'codegen'
param environment str = 'dev'

var uniqueSuffix = uniqueString(resourceGroup().id)
var resourcePrefix = '${applicationName}-${environment}'

// PostgreSQL Flexible Server
resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01-preview' = {
  name: '${resourcePrefix}-pg-${uniqueSuffix}'
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    version: '15'
    administratorLogin: 'pgadmin'
    administratorLoginPassword: 'ChangeMe123!'
    storage: {
      storageSizeGB: 32
    }
  }
}

// Azure Cache for Redis
resource redisCache 'Microsoft.Cache/Redis@2023-08-01' = {
  name: '${resourcePrefix}-redis-${uniqueSuffix}'
  location: location
  properties: {
    sku: {
      name: 'Basic'
      family: 'C'
      capacity: 0
    }
  }
}

// Azure OpenAI
resource openAIResource 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: '${resourcePrefix}-openai-${uniqueSuffix}'
  location: location
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: '${resourcePrefix}-openai-${uniqueSuffix}'
  }
}

// Azure Kubernetes Service (AKS)
resource aksCluster 'Microsoft.ContainerService/managedClusters@2023-08-01' = {
  name: '${resourcePrefix}-aks'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    dnsPrefix: '${resourcePrefix}-aks'
    agentPoolProfiles: [
      {
        name: 'agentpool'
        count: 2
        vmSize: 'Standard_D2s_v3'
        osType: 'Linux'
        mode: 'System'
      }
    ]
  }
}
