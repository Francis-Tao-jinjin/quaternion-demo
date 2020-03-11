export type REGL = any;

function _moduleLoader<ModType> (modDefn:(regl:REGL, requireREGL:typeof _moduleLoader) => ModType) : ModType {
  return <ModType><any>void 0;
}

export type REGLLoader = typeof _moduleLoader;

export function createREGLCache(regl) : REGLLoader {
  const definitionCache:any[] = [];
  const valueCache:any[] = [];

  function requireModule<ModuleType> (
    moduleDefinition:(regl:any, requireRegl:typeof requireModule) => ModuleType) : ModuleType {
    const idx = definitionCache.indexOf(moduleDefinition);
    if (idx >= 0) {
      return valueCache[idx];
    }
    const moduleValue = moduleDefinition(regl, requireModule);
    definitionCache.push(moduleDefinition);
    valueCache.push(moduleValue);
    return moduleValue;
  }

  return requireModule;
}