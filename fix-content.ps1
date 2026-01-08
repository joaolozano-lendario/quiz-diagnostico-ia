$content = Get-Content 'D:/deploy-ready/quiz-diagnostico-ia/src/data/content.ts' -Raw -Encoding UTF8

# 1. Corrigir tagIds.perfis
$content = $content -replace "'visionario-perdido': 223,", "'sobrecarregado': 223,"
$content = $content -replace "'executor-sobrecarregado': 224,", "'curioso-travado': 224,"
$content = $content -replace "'curioso-travado': 225,", "'tecnico-frustrado': 225,"
$content = $content -replace "'tecnico-frustrado': 226,", "'lider-isolado': 226"
$content = $content -replace "'lider-isolado': 227\r?\n", ""

# 2. Corrigir tagIds.situacao
$content = $content -replace "'lideranca': 206,", "'empresario-ativo': 206,"
$content = $content -replace "'time-pequeno': 207,", "'estruturando': 207,"
$content = $content -replace "'autonomo': 208,", "'funcionario': 208,"
$content = $content -replace "'transicao': 209", "'consultor': 209"

# 3. Corrigir tagIds.experienciaIA
$content = $content -replace "'usa-diariamente': 210,", "'usa-bem': 210,"
$content = $content -replace "'testa-ocasionalmente': 211,", "'tentou-nao-funcionou': 211,"
$content = $content -replace "'tentou-parou': 212,", "'nunca-tentou': 212,"
$content = $content -replace "'nunca-usou': 213", "'nao-sabe': 213"

# 4. Corrigir tagIds.barreiras
$content = $content -replace "'custo': 216,", "'equipe': 216,"
$content = $content -replace "'confianca': 217", "'custo': 217"

# 5. Corrigir tagIds.interesse
$content = $content -replace "'produtividade': 218,", "'baixa-prioridade': 218,"
$content = $content -replace "'automacao': 219,", "'alta-prioridade': 219,"
$content = $content -replace "'decisoes': 220", "'urgente': 220,`n    'ja-implementando': 227"

Set-Content -Path 'D:/deploy-ready/quiz-diagnostico-ia/src/data/content.ts' -Value $content -NoNewline -Encoding UTF8
Write-Host "tagIds corrigidos com sucesso"
