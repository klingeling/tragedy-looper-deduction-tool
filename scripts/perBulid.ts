import 'path';
import fs from 'fs';


const types = ['characters', 'scripts', 'plots', 'roles', 'tragedys', 'incedents'] as const;

const dirs = fs.readdirSync('./data');
const data =
    Promise.all(
        dirs.flatMap(folder => types.map(t => [folder, t] as const))
            .map(([folder, type]) => [`./data/${folder}/${type}.json`, type] as const)
            .filter(([x]) => fs.existsSync(x))
            .map(([scriptLocation, type]) => new Promise<readonly [string, typeof types[number]]>((resolve, reject) => {
                fs.readFile(scriptLocation, 'utf-8', (err, data) => {
                    if (err !== null) {
                        reject(err);
                    } else {
                        resolve([data, type] as const);
                    }
                })
            }))
    );



data.then(x => {

    const data = types.map(type => {
        return [type, x.filter(([, t]) => t == type).map(([x]) => x).filter(x => {
            try {
                const parsed = JSON.parse(x);
                return typeof parsed == 'object' && Array.isArray(parsed);
            } catch (error) {
                console.error(error);
                return false;
            }
        })] as const;
    });

    return data.map(([type, arrays]) => {

        return `export const ${type} = [\n${arrays.map(x => ` ...${x}`).reduce((p, c) => `${p}${p.length > 0 ? ',' : ''}\n${c}`, '')}\n] as const`;

    }).reduce((p, c) => `${p};\n${c}`, '')




}
).then(x => {

    fs.writeFileSync('./src/data.ts', x);
    console.log('finished')
}
)