// Hub provider plugin: DeepSeek's own service. The endpoint and protocol are the
// plugin's facts; the person supplies only the key.
import compatible from '../provider-compatible/provider.mjs';
const endpoint = Object.freeze({ url: 'https://api.deepseek.com', api: 'openai-completions' });
export default {
  apiVersion: 1,
  descriptor: {
    id: 'deepseek', version: 1, owner: 'hub',
    name: { en: 'DeepSeek', 'zh-CN': 'DeepSeek', 'zh-TW': 'DeepSeek', ja: 'DeepSeek' },
    authMethods: ['api-key'],
    configuration: { modelDeclarations: false, fields: [{ name: 'token', type: 'secret', label: { en: 'API key', 'zh-CN': 'API 密钥', 'zh-TW': 'API 金鑰', ja: 'API キー' } }] },
    catalog: { refresh: true },
  },
  configure(input) {
    for (const key of ['url', 'api']) if (input[key] !== undefined && input[key] !== endpoint[key]) throw new Error(`This provider type does not allow overriding ${key}`);
    if (input.declarations !== undefined) throw new Error('This provider type does not accept custom model declarations');
    return { ...endpoint };
  },
  fetchCatalog({ credential }) { return compatible.fetchCatalog({ endpoint, credential }); },
};
