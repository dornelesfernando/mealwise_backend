import { sequelize } from '../../models/index.js';
import readline from 'readline';

import { User, UserCreationAttributes } from '../../modules/user/user.js';
import {
  Project,
  ProjectCreationAttributes,
} from '../../modules/project/project.js';
import { Task, TaskCreationAttributes } from '../../modules/task/task.js';
import {
  Position,
  PositionCreationAttributes,
} from '../../modules/position/position.js';
import { Enums } from '../../enums/Enums.js';
import { hashPassword } from '../../hooks/crypto.js';

async function seedDatabase() {
  console.log('Starting seeder...');
  const transaction = await sequelize.transaction();

  try {
    const now = new Date();

    // 2. Data creation, folMediuming dependency order
    console.log('Seeding Departments...');
    const positions: PositionCreationAttributes[] = await Position.bulkCreate(
      [{ name: 'Desenvolvedor (root)', hierarchical_level: 9999 }],
      { transaction },
    );
    const position = positions[0];
    if (!position.id) {
      throw new Error('Falha ao criar Posição (Positions) no seeder.');
    }

    console.log('Seeding Users...');
    const hashedPassword = await hashPassword('usertest');
    const users: UserCreationAttributes[] = await User.bulkCreate(
      [
        {
          name: 'Fernando Dorneles da Silva',
          email: 'fernando.dorneles@ecomp.ufsm.br',
          password: 'usertest',
          password_hash: hashedPassword,
          hiring_date: now,
          position_id: position.id,
        },
      ],
      { transaction },
    );
    const user = users[0];
    if (!user.id) {
      throw new Error('Falha ao criar Usuário (Users) no seeder.');
    }

    console.log('Seeding Projects...');
    const projects: ProjectCreationAttributes[] = await Project.bulkCreate(
      [
        {
          name: 'Geral',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Backend',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'FrontEnd',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Testes',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Hospedagem, Infraestrutura e Arquitetura',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Novas Funcionalidades',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Segurança e Conformidade',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Automação',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Documentação e boas práticas',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mobile',
          status: Enums.Status.Arquived,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
        },
      ],
      { transaction },
    );
    const geral = projects[0];
    const backend = projects[1];
    const frontend = projects[2];
    const testes = projects[3];
    const hospedagem = projects[4];
    const newFunc = projects[5];
    const security = projects[6];
    const integration = projects[7];
    const automation = projects[8];
    const documentation = projects[9];
    const mobile = projects[10];

    if (
      !geral.id ||
      !backend.id ||
      !frontend.id ||
      !testes.id ||
      !hospedagem.id ||
      !newFunc.id ||
      !security.id ||
      !integration.id ||
      !automation.id ||
      !documentation.id ||
      !mobile.id
    ) {
      throw new Error('Falha ao criar Projeto (Projects) no seeder.');
    }

    console.log('Seeding Projects...');
    await Project.bulkCreate(
      [
        {
          name: 'UI/Temas/Customização',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: frontend.id,
        },
        {
          name: 'UX/Usabilidade',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: frontend.id,
        },
        {
          name: 'Inteligência Artificial e Machine Learning',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: integration.id,
        },
        {
          name: 'Ferramentas para Desenvolvedores',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: documentation.id,
        },
        {
          name: 'Conceitos de Web3 e Descentralização',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: backend.id,
        },
        {
          name: 'Otimização de Performance',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: hospedagem.id,
        },
        {
          name: 'DX e Ferramentas',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: documentation.id,
        },
        {
          name: 'PWA e Experiência Mobile',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: mobile.id,
        },
        {
          name: 'Formulários e Inputs',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: frontend.id,
        },

        {
          name: 'Gestão de Usuários',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Gestão de Projetos',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Gestão de Tarefas',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Gestão de Tempo',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Gestão de Arquivos',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Gestão de Patrimonio',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Gestão de Clientes e Stakeholders',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },

        {
          name: 'Comunicação e Colaboração em Projetos, Tarefas e Equipe.',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Notificações',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Relatórios',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Financeiro',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Dashboards',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Recursos Humanos',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Impressão e Exportação',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },
        {
          name: 'Acessibilidade e Inclusão',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: newFunc.id,
        },

        {
          name: 'Governança, Risco e Conformidade (GRC)',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: geral.id,
        },
        {
          name: 'Sustentabilidade e Governança (ESG)',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: geral.id,
        },
        {
          name: 'Educação e Gestão do Conhecimento (LMS)',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: geral.id,
        },
        {
          name: 'Finanças Corporativas e Análise (FP&A)',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: geral.id,
        },
        {
          name: 'Resiliência e Engenharia do Caos',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Low,
          parent_id: geral.id,
        },

        // Testes automatizados
        {
          name: 'Configuração da Base de Testes ',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Critical,
          parent_id: testes.id,
        },
        {
          name: 'Testes Unitários',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: testes.id,
        },
        {
          name: 'Testes de Componentes',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: testes.id,
        },
        {
          name: 'Testes de Integração',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: testes.id,
        },
        {
          name: 'Testes End-to-End',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: testes.id,
        },
        {
          name: 'Testes Especializados e de Qualidade Contínua',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Medium,
          parent_id: testes.id,
        },

        // Hospedagem e infraestrutura
        {
          name: 'Planejamento e Fundamentos da Infraestrutura',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: hospedagem.id,
        },
        {
          name: 'Configuração do Ambiente e Contas (IAM)',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Critical,
          parent_id: hospedagem.id,
        },
        {
          name: 'Infraestrutura como Código (IaC) com Terraform',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Critical,
          parent_id: hospedagem.id,
        },
        {
          name: 'Banco de Dados e Armazenamento',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Critical,
          parent_id: hospedagem.id,
        },
        {
          name: 'Containerização e Orquestração',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: hospedagem.id,
        },
        {
          name: 'Build e Deploy',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: hospedagem.id,
        },
        {
          name: 'Rede, DNS e Segurança',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Critical,
          parent_id: hospedagem.id,
        },
        {
          name: 'Monitoramento, Logging e Alertas',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.High,
          parent_id: hospedagem.id,
        },
        {
          name: 'Manutenção e Otimização Contínua',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
          priority: Enums.Priority.Medium,
          parent_id: hospedagem.id,
        },
      ],
      { transaction },
    );

    console.log('Seeding Tasks...');
    const tasks: TaskCreationAttributes[] = await Task.bulkCreate(
      [
        {
          name: 'Login via SSO (Google, Microsoft)',
          description: 'Implementar autenticação OAuth2.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Autenticação de Dois Fatores (2FA)',
          description: 'Adicionar verificação por App (Google Auth) ou SMS.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Log de Auditoria',
          description:
            'Criar um registro de todas as ações importantes dos usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Papéis (Roles) Personalizáveis',
          description:
            'Permitir que administradores criem e definam permissões para novos papéis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Equipes',
          description: 'Criar a entidade "Equipe" e permitir agrupar usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Convite de Novos Usuários',
          description:
            'Desenvolver fluxo de convite por e-mail com token de validação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Perfil de Usuário',
          description:
            'Adicionar campos como foto, cargo, fuso horário e redes sociais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Status de Usuário',
          description:
            'Implementar status (Online, Ausente, Offline, Em Férias).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo de Representação (Impersonate)',
          description:
            'Permitir que administradores naveguem no sistema como outro usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Políticas de Senha',
          description: 'Forçar complexidade, expiração e histórico de senhas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Chaves de API por Usuário',
          description:
            'Gerar tokens de API para permitir integrações externas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Acesso de Convidado/Cliente',
          description:
            'Criar um papel com permissões limitadas para visualização de projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Importação de Usuários em Massa',
          description:
            'Desenvolver funcionalidade de upload de CSV para criar usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gerenciamento de Sessões Ativas',
          description:
            'Permitir que usuários visualizem e revoguem suas sessões ativas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Templates de Projeto',
          description:
            'Criar projetos pré-configurados com tarefas e equipes padrão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Dashboard de Projetos',
          description:
            'Desenvolver uma visão geral com status, orçamento e progresso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gráfico de Gantt',
          description:
            'Implementar visualização de cronograma de projetos e tarefas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Quadros Kanban',
          description:
            'Criar uma visualização de tarefas em colunas (To Do, In Progress, Done).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Marcos (Milestones) do Projeto',
          description:
            'Adicionar marcos com datas para representar entregas importantes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Orçamento do Projeto',
          description:
            'Implementar controle de custos e horas versus o orçado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Status de Saúde do Projeto',
          description:
            'Adicionar um campo de status (Em dia, Em Risco, Atrasado).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Arquivamento de Projetos',
          description:
            'Permitir que projetos finalizados sejam arquivados (somente leitura).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Duplicação de Projetos',
          description: 'Criar uma cópia exata de um projeto existente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Visão de Portfólio',
          description:
            'Criar uma tela que consolida os dados de múltiplos projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Dependências entre Projetos',
          description: 'Permitir que um projeto dependa do término de outro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Campos Personalizados para Projetos',
          description:
            'Adicionar campos customizáveis (texto, número, data) aos projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Dependências entre Tarefas',
          description:
            'Implementar lógica de "esta tarefa só pode começar após outra terminar".',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sub-tarefas',
          description:
            'Permitir a criação de tarefas filhas dentro de uma tarefa pai.',
          status: Enums.Status.Completed,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Tarefas Recorrentes',
          description:
            'Configurar tarefas para serem criadas automaticamente (diária, semanal, etc.).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Priorização de Tarefas',
          description:
            'Criar funcionalidade de rank em tarefas de mesmo nível de prioridade baseado em prazos, tarefas e a compôe e outros fatores.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Múltiplos Responsáveis por Tarefa',
          description:
            'Permitir que mais de um usuário seja designado para uma tarefa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Comentários e Menções em Tarefas',
          description:
            'Adicionar um feed de comentários com a funcionalidade de mencionar (@usuário).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Checklist na Tarefa',
          description:
            'Implementar uma lista de itens a serem marcados dentro de uma tarefa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Histórico de Alterações da Tarefa',
          description:
            'Registrar todas as mudanças de status, responsável, descrição, etc.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Seguidores de Tarefa (Watchers)',
          description:
            'Permitir que usuários "sigam" uma tarefa para receber notificações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Tarefas Privadas',
          description:
            'Criar tarefas visíveis apenas para o criador e os responsáveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Edição de Tarefas em Massa',
          description:
            'Permitir a alteração de status, responsável, etc., para várias tarefas de uma vez.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Etiquetas (Tags/Labels) para Tarefas',
          description:
            'Implementar sistema de categorização de tarefas com etiquetas coloridas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Timesheet Semanal/Mensal',
          description: 'Gerar uma folha de horas consolidada por usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Relatório de Produtividade da Equipe',
          description:
            'Criar um relatório que mostre tarefas concluídas e horas por membro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Cronômetro (Timer) na Tarefa',
          description:
            'Adicionar um botão de play/pause para registrar horas automaticamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Horas Faturáveis vs. Não Faturáveis',
          description:
            'Adicionar um marcador aos logs de horas para classificar o tipo de trabalho.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Relatórios Customizados',
          description:
            'Permitir que usuários criem seus próprios relatórios escolhendo métricas e filtros.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Exportação de Relatórios (PDF, CSV)',
          description:
            'Implementar a funcionalidade de exportar qualquer relatório.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Relatório de Capacidade da Equipe',
          description:
            'Analisar as horas alocadas versus a capacidade total de trabalho da equipe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Aprovação de Timesheets',
          description:
            'Criar um fluxo onde gestores aprovam as folhas de ponto de seus liderados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Chat por Projeto',
          description:
            'Implementar um canal de chat em tempo real para cada projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Feed de Notícias/Anúncios',
          description: 'Criar uma área para comunicados gerais da empresa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Calendário de Equipe',
          description:
            'Desenvolver um calendário compartilhado com eventos, prazos e férias.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Base de Conhecimento (Wiki) por Projeto',
          description:
            'Permitir a criação de uma documentação interna para cada projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Votação em Tarefas/Decisões',
          description:
            'Adicionar um sistema de enquete nos comentários de uma tarefa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Edição Colaborativa de Documentos',
          description:
            'Integrar um editor de texto em tempo real (similar ao Google Docs).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Repositório Global de Arquivos',
          description:
            'Criar uma área central para todos os arquivos, desvinculados de projetos/tarefas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pré-visualização de Arquivos',
          description:
            'Implementar visualizador para PDF, imagens, e documentos de texto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Google Drive/Dropbox',
          description:
            'Permitir anexar arquivos diretamente de serviços de nuvem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Versionamento de Arquivos',
          description:
            'Manter um histórico de versões para cada arquivo anexado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Links de Compartilhamento Externo',
          description:
            'Gerar links públicos (com senha opcional) para compartilhar arquivos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Central de Notificações In-App',
          description:
            'Criar um painel dentro do sistema para visualizar todas as notificações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Notificações por E-mail Configuráveis',
          description:
            'Permitir que o usuário escolha quais notificações por e-mail deseja receber.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Notificações Push (Mobile/Desktop)',
          description:
            'Implementar service workers para enviar notificações ao navegador/celular.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Slack/Teams',
          description:
            'Enviar notificações para canais específicos no Slack ou Microsoft Teams.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'E-mails de Resumo Diário/Semanal',
          description:
            'Enviar um resumo das atividades e tarefas pendentes para o usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Alertas de Prazos',
          description:
            'Notificar usuários quando uma tarefa ou projeto está próximo do vencimento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Calendários (Google, Outlook)',
          description:
            'Sincronizar prazos de tarefas e projetos com o calendário do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Git (GitHub, GitLab)',
          description: 'Associar commits e branches a tarefas específicas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'API Pública',
          description: 'Expor uma API REST/GraphQL para clientes e parceiros.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Webhooks',
          description:
            'Enviar eventos do sistema (ex: tarefa criada) para URLs externas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Automações (Workflows)',
          description:
            'Permitir a criação de regras (ex: "SE tarefa movida para \'Concluído\', ENVIAR e-mail").',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Zapier/Make',
          description: 'Desenvolver um app oficial na plataforma Zapier/Make.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'CRM Integration (Salesforce, HubSpot)',
          description:
            'Sincronizar projetos com contas e oportunidades de um CRM.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Auto-atribuição de Tarefas',
          description:
            'Definir regras para atribuir novas tarefas a usuários específicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Tema Escuro (Dark Mode)',
          description: 'Implementar um seletor de tema para a interface.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Dashboards Personalizáveis',
          description:
            'Permitir que usuários montem seus dashboards com widgets.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Filtros Salvos',
          description:
            'Permitir que usuários salvem conjuntos de filtros para uso futuro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Suporte a Múltiplos Idiomas (i18n)',
          description: 'Estruturar o frontend para suportar traduções.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Templates de E-mail Customizáveis',
          description:
            'Permitir que administradores editem o conteúdo dos e-mails transacionais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Customização de Logo e Cores (White-label)',
          description:
            'Permitir que clientes usem sua própria marca no sistema.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Atalhos de Teclado',
          description:
            'Implementar atalhos para ações comuns (criar tarefa, buscar, etc.).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Busca Global',
          description:
            'Criar uma barra de busca que pesquise em projetos, tarefas, arquivos e comentários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Lixeira',
          description:
            'Implementar "soft delete" para que itens apagados possam ser restaurados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ferramenta de Backup e Exportação de Dados',
          description:
            'Permitir que administradores exportem todos os dados da conta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise Preditiva de Prazos',
          description:
            'Usar IA para prever a probabilidade de um projeto atrasar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sugestão Inteligente de Tarefas',
          description: 'Usar IA para sugerir a quem atribuir uma nova tarefa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'App Mobile (iOS/Android)',
          description:
            'Desenvolver um aplicativo nativo ou PWA para dispositivos móveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Acessibilidade (WCAG)',
          description:
            'Adequar o sistema aos padrões de acessibilidade para leitores de tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gamificação',
          description: 'Introduzir sistema de pontos, medalhas e leaderboards.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'OCR em Anexos',
          description:
            'Extrair texto de imagens e PDFs para torná-los pesquisáveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Assinatura Digital de Documentos',
          description:
            'Integrar um serviço para assinar documentos enviados ao sistema.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo Financeiro',
          description:
            'Gerar faturas (invoices) a partir de projetos e horas faturáveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Chatbot de Suporte',
          description:
            'Integrar um chatbot para responder dúvidas comuns dos usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mapeamento de Competências',
          description:
            'Associar competências aos usuários e sugerir alocação em tarefas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Sentimento',
          description:
            'Analisar comentários para medir a "saúde" da comunicação no projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo Foco',
          description:
            'Criar uma interface simplificada que esconde distrações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Página de Status do Sistema (Status Page)',
          description:
            'Criar uma página pública que informa sobre a disponibilidade dos serviços.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gerenciamento de Riscos',
          description:
            'Criar um módulo para identificar, avaliar e mitigar riscos em projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Formulários Públicos',
          description:
            'Criar formulários que podem ser preenchidos por externos para criar tarefas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com BI (Power BI, Tableau)',
          description:
            'Criar um conector de dados para ferramentas de Business Intelligence.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gerenciamento de OKRs',
          description:
            'Implementar um módulo para definir e acompanhar Objetivos e Resultados-Chave.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Feedback 360°',
          description:
            'Criar um sistema de feedback entre os membros da equipe ao final do projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Planejamento de Sprints (Scrum)',
          description:
            'Adicionar funcionalidades de planejamento, backlog e execução de sprints.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gráfico de Burndown',
          description:
            'Implementar um gráfico que mostra o progresso do trabalho em uma Sprint.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Despesas por Projeto',
          description:
            'Permitir o lançamento de custos (viagens, materiais) e anexar recibos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração de Faturas a partir de Horas',
          description:
            'Criar faturas (invoices) automaticamente com base nas horas faturáveis registradas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Gateways de Pagamento',
          description:
            'Conectar com Stripe/PayPal para receber pagamentos de faturas online.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Faturas Recorrentes',
          description:
            'Configurar o envio automático de faturas para contratos de avença mensal (retainers).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Suporte a Múltiplas Moedas',
          description:
            'Permitir faturamento e registro de despesas em diferentes moedas com conversão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Configuração de Taxas e Impostos',
          description:
            'Criar e aplicar diferentes alíquotas de impostos às faturas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Lucratividade',
          description:
            'Desenvolver um dashboard que compare receita faturada versus custos e horas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Ordens de Compra',
          description:
            'Criar, aprovar e associar ordens de compra a projetos e despesas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Emissão de Notas de Crédito',
          description:
            'Permitir a criação de notas de crédito para abater valores de faturas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Contas a Pagar/Receber',
          description:
            'Controlar o status de pagamento de faturas emitidas e despesas lançadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Avaliação de Desempenho',
          description:
            'Criar ciclos de avaliação com formulários customizáveis e feedback.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sistema de Reconhecimento (Kudos)',
          description:
            'Permitir que membros da equipe enviem elogios e reconhecimentos públicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Matriz de Competências (Skill Matrix)',
          description:
            'Mapear as habilidades de cada usuário para facilitar a alocação em tarefas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Férias e Ausências',
          description:
            'Criar um fluxo de solicitação e aprovação de férias, licenças, etc.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Caixa de Sugestões Anônima',
          description:
            'Implementar um canal para que a equipe envie feedbacks de forma anônima.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Acompanhamento de Humor da Equipe (Pulse)',
          description:
            'Realizar pesquisas rápidas e periódicas sobre o bem-estar da equipe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Visualização de Carga de Trabalho (Workload)',
          description:
            'Criar um painel que mostra a distribuição de tarefas e evita sobrecarga.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Plano de Desenvolvimento Individual (PDI)',
          description:
            'Permitir que gestores e liderados criem e acompanhem metas de carreira.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Agendamento e Pauta de Reuniões 1-on-1',
          description:
            'Ferramenta para agendar, definir pautas e registrar atas de reuniões individuais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Checklists de Onboarding/Offboarding',
          description:
            'Criar templates de tarefas para a entrada e saída de colaboradores.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Portal do Cliente',
          description:
            'Desenvolver uma área restrita para clientes acompanharem seus projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Propostas e Orçamentos',
          description:
            'Criar propostas comerciais que podem ser convertidas em projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Relatórios de Progresso para Clientes',
          description:
            'Gerar relatórios com a marca do cliente para envio periódico.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Solicitações de Mudança',
          description:
            'Formalizar e aprovar pedidos de alteração de escopo feitos pelo cliente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pesquisas de Satisfação (CSAT/NPS)',
          description:
            'Enviar pesquisas ao final de projetos para medir a satisfação do cliente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo Básico de CRM',
          description:
            'Gerenciar contatos, empresas e o histórico de interações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Dashboards Compartilhados Externamente',
          description:
            'Gerar links para dashboards de visualização pública ou protegida por senha.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de Anomalias',
          description:
            'Alertar gestores sobre desvios inesperados em custos, prazos ou produtividade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Otimização de Alocação de Recursos',
          description:
            'Usar IA para sugerir a melhor pessoa para uma tarefa com base em skills e carga.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Categorização Automática de Tarefas',
          description:
            'Usar NLP para analisar a descrição de uma tarefa e sugerir etiquetas e projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Previsão de Riscos',
          description:
            'Analisar o histórico de projetos para prever a probabilidade de um novo projeto atrasar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração de Resumos de Reunião',
          description:
            'Integrar com transcrição de áudio para gerar atas e planos de ação automáticos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de Tarefas Duplicadas',
          description:
            'Alertar o usuário ao criar uma tarefa que parece ser similar a uma já existente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sugestão Inteligente de Estimativas',
          description:
            'Recomendar estimativas de tempo para novas tarefas com base em tarefas similares.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração Automática de Relatórios',
          description:
            'Usar IA para escrever um resumo textual do progresso da semana/mês.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Chaves de Criptografia Gerenciadas pelo Cliente',
          description:
            'Permitir que clientes Enterprise usem suas próprias chaves para criptografar dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ferramentas de Conformidade (LGPD/GDPR)',
          description:
            'Criar um portal para usuários solicitarem a exportação ou exclusão de seus dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Whitelisting de IPs',
          description:
            'Restringir o acesso à plataforma apenas a uma lista de endereços de IP.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Provisionamento via SCIM',
          description:
            'Sincronizar usuários e grupos automaticamente a partir de provedores de identidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: "Marca d'Água em Documentos",
          description:
            "Aplicar marcas d'água dinâmicas em documentos sensíveis ao serem visualizados/exportados.",
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Políticas de Prevenção à Perda de Dados (DLP)',
          description:
            'Criar regras para impedir o compartilhamento de informações sensíveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Opção de Residência de Dados',
          description:
            'Permitir que clientes escolham em qual região geográfica seus dados serão armazenados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Repositório de Snippets de Código',
          description:
            'Criar uma biblioteca interna para compartilhar trechos de código úteis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Débito Técnico',
          description:
            'Criar um tipo de tarefa específico para registrar e priorizar débitos técnicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ambiente Sandbox para API',
          description:
            'Fornecer um ambiente de testes isolado para desenvolvedores que usam a API.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Templates de Ciclo de Vida de Software (SDLC)',
          description:
            'Criar projetos com fases pré-definidas (Design, Dev, QA, Deploy).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração de Release Notes',
          description:
            'Gerar notas de versão automaticamente a partir de tarefas concluídas em um marco.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Pull Requests',
          description:
            'Visualizar o status de PRs (Aberto, Em Revisão, Aprovado) dentro da tarefa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Gestão de Feature Flags',
          description:
            'Controlar a ativação/desativação de funcionalidades diretamente pela plataforma.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fluxo de Aprovação de Documentos',
          description:
            'Criar um workflow onde documentos precisam ser aprovados antes de publicados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Histórico de Versões e Rollback de Conteúdo',
          description:
            'Permitir a visualização de versões antigas de um documento e a restauração.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ferramenta de Mapa Mental',
          description:
            'Integrar um construtor de mapas mentais para brainstorming e planejamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Registro de Decisões (Decision Log)',
          description:
            'Criar uma área para documentar decisões importantes, o contexto e os envolvidos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Organogramas',
          description:
            'Permitir a criação e visualização da estrutura hierárquica da empresa/equipes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Alertas de Revisão de Conteúdo',
          description:
            'Agendar lembretes para que documentos importantes sejam revisados periodicamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Tempo de Ciclo (Cycle Time)',
          description:
            'Medir o tempo que uma tarefa leva do início ao fim do desenvolvimento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Diagrama de Fluxo Cumulativo',
          description:
            'Gerar um gráfico que mostra o acúmulo de tarefas em cada estágio do workflow.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ferramenta de Planejamento de Cenários ("What-if")',
          description:
            'Simular o impacto de mudanças (ex: adicionar pessoas, reduzir prazo) no projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Previsão de Orçamento e Cronograma',
          description:
            'Usar dados históricos para projetar o custo e a data de término de um projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Data Warehouse',
          description:
            'Criar conectores para enviar dados para BigQuery, Redshift, etc.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Campos Calculados Personalizados',
          description:
            'Permitir que usuários criem suas próprias métricas nos relatórios.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Paleta de Comandos (Command Palette)',
          description:
            'Implementar um atalho (Ctrl+K) para buscar e executar qualquer ação no sistema.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo Offline',
          description:
            'Permitir a visualização e criação de tarefas sem conexão com a internet (PWA).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Migração de Dados de Outras Ferramentas',
          description: 'Criar importadores para Trello, Jira, Asana, etc.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Visão "Meu Trabalho"',
          description:
            'Criar uma página inicial personalizada que centraliza todas as tarefas do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Temporizador Pomodoro',
          description:
            'Integrar um timer Pomodoro na interface para ajudar no foco.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Guias Interativos (In-app Tours)',
          description:
            'Criar tutoriais que guiam o usuário passo a passo em novas funcionalidades.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Acessibilidade Aprimorada',
          description:
            'Adicionar temas de alto contraste e navegação completa por teclado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Marketplace de Add-ons',
          description:
            'Criar uma loja para instalar extensões e integrações de terceiros.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Apps (Low-code)',
          description:
            'Permitir a criação de pequenas ferramentas e automações sem código.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Personalização de Temas com CSS',
          description:
            'Permitir que administradores apliquem CSS customizado na plataforma.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'SDK para Desenvolvedores',
          description:
            'Fornecer bibliotecas para facilitar a criação de integrações customizadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'API GraphQL',
          description:
            'Oferecer uma API GraphQL para consultas de dados mais eficientes e flexíveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Programa de Parcerias/Afiliados',
          description:
            'Desenvolver um sistema para que parceiros revendam a plataforma.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Template Gallery (Comunidade)',
          description:
            'Permitir que usuários compartilhem templates de projeto com a comunidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Contratos',
          description:
            'Criar um módulo para armazenar, versionar e rastrear o ciclo de vida de contratos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Monitoramento de SLAs (Service Level Agreement)',
          description:
            'Implementar tracking de SLAs para projetos e alertar sobre possíveis violações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Checklists de Conformidade (ISO, LGPD, etc.)',
          description:
            'Criar templates de tarefas baseados em frameworks de compliance.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Coleta de Evidências para Auditoria',
          description:
            'Permitir a marcação de tarefas e artefatos como evidências para auditorias.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fluxo de Assinatura Digital',
          description:
            'Integrar com plataformas de assinatura (DocuSign, Clicksign) para aprovar documentos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Registro de Riscos do Projeto',
          description:
            'Criar uma matriz para identificar, avaliar (probabilidade x impacto) e mitigar riscos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Plano de Continuidade de Negócios',
          description:
            'Módulo para documentar e gerenciar planos de ação em caso de incidentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Confirmação de Leitura de Políticas',
          description:
            'Exigir que usuários confirmem a leitura de documentos e políticas importantes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Incidentes e Post-mortems',
          description:
            'Criar um workflow para registrar, investigar e documentar lições de incidentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Controle de Versão para Documentos Legais',
          description:
            'Implementar um sistema de versionamento robusto com trilha de auditoria para contratos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Gestão de Ativos Digitais (DAM)',
          description:
            'Criar uma biblioteca central para logos, imagens e vídeos de marketing.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Calendário de Conteúdo e Campanhas',
          description:
            'Desenvolver uma visão de calendário para planejar postagens e campanhas de marketing.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Testes A/B',
          description:
            'Permitir a criação e acompanhamento de variações e resultados de testes A/B.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Calculadora de ROI para Campanhas',
          description:
            'Implementar uma ferramenta para calcular o retorno sobre o investimento de projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Ferramentas de E-mail Marketing',
          description:
            'Sincronizar contatos e disparar campanhas a partir de ações no sistema.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Visão de Funil de Vendas (Pipeline)',
          description:
            'Criar um quadro Kanban para visualizar e gerenciar oportunidades de negócio.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fluxo "Quote-to-Cash"',
          description:
            'Automatizar o processo desde a criação do orçamento até o faturamento e recebimento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização de E-mails com Clientes',
          description:
            'Conectar caixas de entrada para registrar comunicações por e-mail em projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pontuação de Saúde do Cliente (Health Score)',
          description:
            'Calcular uma nota de saúde para cada cliente com base em engajamento e satisfação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Oportunidades (Upsell/Cross-sell)',
          description:
            'Criar um tipo de tarefa para registrar e acompanhar novas oportunidades de negócio.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Fornecedores',
          description:
            'Criar um banco de dados de fornecedores com contatos, contratos e avaliações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Inventário para Projetos',
          description:
            'Monitorar o uso de materiais e insumos físicos vinculados a tarefas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Requisição de Proposta (RFP)',
          description:
            'Criar e enviar RFPs para fornecedores diretamente da plataforma.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Agendamento de Equipamentos e Ativos',
          description:
            'Criar um calendário para reservar o uso de equipamentos compartilhados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Rastreamento Logístico',
          description:
            'Conectar com APIs de transportadoras para monitorar entregas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Controle de Qualidade (QA)',
          description:
            'Criar checklists e fluxos de aprovação para garantir a qualidade das entregas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Templates de Fluxo de Produção',
          description:
            'Desenvolver modelos de projeto para processos de manufatura ou produção.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Desafios de Equipe vs. Equipe',
          description:
            'Criar competições entre times baseadas em métricas de produtividade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Árvore de Habilidades (Skill Tree)',
          description:
            'Permitir que usuários "desbloqueiem" habilidades ao completar treinamentos e tarefas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Loja de Recompensas',
          description:
            'Permitir que usuários troquem pontos ganhos por recompensas (virtuais ou reais).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sistema de "Sequências" (Streaks)',
          description:
            'Recompensar usuários por manterem hábitos diários/semanais (ex: atualizar tarefas).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Celebrações Automatizadas',
          description:
            'Gerar notificações e celebrações automáticas para aniversários e tempo de casa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Avatares e Perfis Personalizáveis',
          description:
            'Permitir que usuários customizem seus perfis com itens desbloqueáveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Descoberta de "Easter Eggs"',
          description:
            'Esconder funcionalidades ou itens secretos na plataforma para engajar na exploração.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Quadro Branco Digital Interativo',
          description:
            'Implementar uma ferramenta de lousa digital para colaboração em tempo real.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mensagens de Vídeo Assíncronas',
          description:
            'Permitir a gravação e envio de vídeos curtos nos comentários (similar ao Loom).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Notas Colaborativas em Reuniões',
          description:
            'Integrar um editor de texto em tempo real nas páginas de eventos do calendário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gerador de Pauta de Reunião',
          description:
            'Ferramenta que sugere e estrutura pautas com base em tarefas e projetos ativos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Acordo de Trabalho (Team Charter)',
          description:
            'Guiar equipes na criação de um documento com suas regras de trabalho e comunicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ferramentas de Brainstorming Estruturado',
          description:
            'Implementar métodos como "Six Thinking Hats" ou "Crazy Eights" em workshops virtuais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Lacunas de Competências (Skill Gap)',
          description:
            'Comparar as habilidades necessárias para um projeto com as existentes na equipe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Certificações e Treinamentos',
          description:
            'Manter um registro das certificações dos funcionários e suas datas de validade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Alocação de Recursos Multi-Projetos',
          description:
            'Criar uma visão consolidada para alocar a capacidade de uma pessoa em vários projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Planejamento de Capacidade por Função (Role)',
          description:
            'Estimar a necessidade futura de contratação com base na demanda de projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gestão de Mentoria',
          description:
            'Criar um programa para conectar mentores e aprendizes e acompanhar o progresso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Requisição de Recursos Interdepartamental',
          description:
            'Formalizar o "empréstimo" de profissionais entre diferentes departamentos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Editor Visual de Workflows',
          description:
            'Permitir a criação de automações arrastando e conectando blocos de lógica.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Formulários com Lógica Condicional',
          description:
            'Criar formulários onde os campos mudam com base nas respostas anteriores.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gatilhos por E-mail',
          description:
            'Iniciar automações ao receber um e-mail em um endereço específico.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Automações Agendadas',
          description:
            'Configurar rotinas para serem executadas em horários específicos (ex: toda sexta-feira).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Bloco de Script Customizado',
          description:
            'Permitir a execução de código JavaScript/Python dentro de uma automação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fluxos de Aprovação Multi-nível',
          description:
            'Criar aprovações que exigem múltiplos aprovadores em sequência ou em paralelo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Simulação de Monte Carlo',
          description:
            'Usar análise estatística para prever os resultados mais prováveis de um projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Causa Raiz (RCA)',
          description:
            'Implementar ferramentas como "5 Porquês" ou "Diagrama de Ishikawa" para investigar problemas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mapa de Interações da Equipe',
          description:
            'Gerar um diagrama de rede que mostra quem mais interage com quem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise Preditiva de Rotatividade (Churn)',
          description:
            'Usar IA para identificar funcionários com risco de deixar a empresa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mapa de Calor de Utilização de Recursos',
          description:
            'Visualizar graficamente os períodos de maior e menor alocação de pessoas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Cálculo de "Custo do Atraso" (Cost of Delay)',
          description:
            'Adicionar um campo para calcular o impacto financeiro de não concluir uma tarefa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Embedding de Dashboards Externos',
          description:
            'Permitir a incorporação de painéis do Power BI, Tableau, etc., dentro do sistema.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo de Apresentação para Dashboards',
          description:
            'Criar um modo de tela cheia que otimiza dashboards para exibição em reuniões.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Moderação de Conteúdo Gerado pelo Usuário',
          description:
            'Ferramentas para administradores revisarem e aprovarem conteúdo público (ex: templates).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ambientes de Teste (Staging)',
          description:
            'Oferecer instâncias sandbox para clientes Enterprise testarem configurações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Página de Status Pública com Assinatura',
          description:
            'Permitir que usuários assinem para receber atualizações sobre incidentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'App Mobile com Marca Própria (White-label)',
          description:
            'Oferecer uma versão do app mobile com a marca do cliente Enterprise.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Arquitetura "Headless"',
          description:
            'Permitir o uso do backend via API com um frontend totalmente customizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Opção de Hospedagem On-Premise',
          description:
            'Oferecer uma versão do software que pode ser instalada na infraestrutura do cliente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Programa de Certificação para Desenvolvedores',
          description:
            'Criar um programa de treinamento e certificação para parceiros que usam a API.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Faturamento Baseado em Uso (Usage-based)',
          description:
            'Implementar modelos de cobrança que variam conforme o consumo (ex: por automação).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'CLI (Command-Line Interface)',
          description:
            'Desenvolver uma ferramenta de linha de comando para interagir com a plataforma.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Laboratório de Inovação (Labs)',
          description:
            'Criar uma área onde usuários podem testar funcionalidades beta e dar feedback.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Backup Diferencial e Incremental',
          description:
            'Otimizar o processo de backup para salvar apenas as alterações desde o último backup.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Marketplace de Consultores',
          description:
            'Criar um diretório de consultores certificados para ajudar clientes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Acesso Programático ao Log de Auditoria',
          description:
            'Permitir que sistemas de SIEM consumam os logs de auditoria via API.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Programa de Recompensa por Bugs (Bug Bounty)',
          description:
            'Estruturar um programa para recompensar pesquisadores de segurança que encontram falhas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização Bidirecional de Banco de Dados',
          description:
            'Permitir a replicação de dados em tempo real entre a plataforma e o banco do cliente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Assistente Pessoal de IA',
          description:
            'Desenvolver um agente de IA que gerencia a agenda e prioriza tarefas para o usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Interface Adaptativa',
          description:
            'Criar uma UI que se reorganiza dinamicamente com base nos padrões de uso individuais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Briefing Diário Personalizado',
          description:
            'Gerar um resumo matinal com foco, métricas e alertas customizados para cada usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Decomposição de Metas por IA',
          description:
            'Permitir que a IA quebre um objetivo complexo em um plano de tarefas executáveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Coaching de Produtividade',
          description:
            'Fornecer insights e sugestões personalizadas para melhorar a eficiência do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Interface Controlada por Voz',
          description:
            'Implementar comandos de voz para criar tarefas, navegar e solicitar informações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Agendador Inteligente de Reuniões',
          description:
            'Usar IA para analisar calendários e encontrar o horário ideal para todos os participantes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sugestão de Delegação Inteligente',
          description:
            'A IA recomenda para quem delegar uma tarefa com base na carga e competência.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Resumo de Tópicos (TL;DR)',
          description:
            'Gerar resumos automáticos para longas descrições de tarefas ou threads de comentários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mapeamento de Conhecimento Tácito',
          description:
            'A IA identifica especialistas em tópicos específicos com base em suas atividades.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Calculadora de Pegada de Carbono',
          description:
            'Estimar e relatar a emissão de carbono associada a projetos e viagens.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Avaliação de Fornecedores (ESG Score)',
          description:
            'Rastrear e pontuar fornecedores com base em critérios ambientais, sociais e de governança.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Horas de Voluntariado',
          description:
            'Criar um tipo de log de horas específico para atividades de voluntariado corporativo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Dashboards de Diversidade e Inclusão (D&I)',
          description:
            'Apresentar métricas anonimizadas sobre a diversidade na alocação de projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Redução de Resíduos',
          description:
            'Módulo para registrar e medir iniciativas de redução de lixo em projetos físicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Checklist de Compras Sustentáveis',
          description:
            'Integrar critérios de compra ética e sustentável no processo de aquisição.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Relatórios para Padrões (GRI/SASB)',
          description:
            'Gerar relatórios de sustentabilidade seguindo frameworks de mercado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Doações e Investimento Social',
          description:
            'Controlar o orçamento e a aplicação de recursos em projetos sociais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulos de Micro-aprendizagem (Microlearning)',
          description:
            'Integrar pílulas de conhecimento e tutoriais rápidos ao lado de funcionalidades.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Trilhas de Aprendizagem',
          description:
            'Montar sequências de cursos e conteúdos vinculadas a papéis e planos de carreira.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Testes de Avaliação de Competências',
          description:
            'Criar quizzes para avaliar o nível de conhecimento técnico ou teórico dos usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sugestão de Treinamento por IA',
          description:
            'Recomendar cursos com base no desempenho do usuário em tarefas e seus objetivos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Plataformas de Cursos',
          description:
            'Conectar com Coursera, Udemy, etc., para importar e rastrear o progresso de cursos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Marketplace de Conhecimento Interno',
          description:
            'Permitir que colaboradores ofereçam e procurem ajuda em tópicos específicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Indicador de Risco de Burnout',
          description:
            'Analisar padrões de trabalho (horas extras, fim de semana) para alertar gestores.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Deslocamento Digital" (Digital Commute)',
          description:
            'Criar rituais de início e fim de dia para ajudar a desconectar do trabalho.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Blocos de "Não Incomodar"',
          description:
            'Permitir o agendamento de blocos de tempo para trabalho focado, sem interrupções.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Apps de Meditação',
          description:
            'Conectar com Calm ou Headspace para sugerir pausas e exercícios de mindfulness.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Horário de Silêncio Configurável',
          description:
            'Desativar todas as notificações fora do horário de trabalho definido pelo usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Relatórios Anonimizados de Estresse da Equipe',
          description:
            'Fornecer aos gestores uma visão geral do nível de estresse do time sem expor indivíduos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de Tarefas por QR Code',
          description:
            'Associar QR codes a equipamentos ou locais para rápido acesso a tarefas relacionadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Check-in por Proximidade (NFC/Beacon)',
          description:
            'Fazer o apontamento de horas ou a atualização de tarefas ao aproximar o celular de um local.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Dispositivos de Escritório Inteligente',
          description:
            'Reservar salas de reunião ou equipamentos diretamente pela tarefa no sistema.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Monitoramento de Equipes de Campo',
          description:
            'Integrar mapas para visualização em tempo real da localização de equipes externas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ingestão de Dados de Sensores IoT',
          description:
            'Conectar tarefas a sensores para monitoramento (ex: temperatura, umidade, vibração).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Anotação em Imagens de Drones/Satélite',
          description:
            'Permitir o upload e a criação de tarefas diretamente sobre imagens aéreas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Grupos de Interesse (Círculos/Guildas)',
          description:
            'Criar espaços para que pessoas com interesses comuns (ex: tecnologia, esportes) interajam.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Podcast/Áudio Updates Internos',
          description:
            'Permitir a gravação e distribuição de atualizações curtas em formato de áudio.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fórum de "Mostre seu Trabalho" (Show and Tell)',
          description:
            'Criar um espaço para equipes apresentarem seus projetos e resultados de forma informal.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pausa para o Café Virtual',
          description:
            'Agendar aleatoriamente pequenas reuniões entre pessoas de times diferentes para socializar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sessões de "Pergunte-me Qualquer Coisa" (AMA)',
          description:
            'Organizar eventos onde a liderança responde perguntas da equipe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Diretório de Hobbies e Interesses',
          description:
            'Permitir que usuários compartilhem seus interesses pessoais para criar conexões.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Simulação de Crises (Fire Drill)',
          description:
            'Criar projetos simulados de incidentes para treinar a capacidade de resposta da equipe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ferramenta de Análise Pré-mortem',
          description:
            'Conduzir um exercício estruturado para imaginar por que um projeto poderia falhar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Pontos Únicos de Falha (SPOF)',
          description:
            'Identificar pessoas que são a única fonte de conhecimento para tarefas críticas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Planejamento de Contingência',
          description:
            'Documentar planos de ação alternativos (Plano B) para riscos identificados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Planejamento de Sucessão de Conhecimento',
          description:
            'Criar planos para transferir conhecimento crítico antes da saída de um membro da equipe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mapa de Dependências Críticas',
          description:
            'Visualizar a rede de dependências entre tarefas, projetos e equipes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Previsões Contínuas (Rolling Forecasts)',
          description:
            'Implementar projeções financeiras que se atualizam continuamente (ex: próximos 12 meses).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rastreamento de CapEx vs. OpEx',
          description:
            'Classificar despesas de projetos como investimento ou custo operacional.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modelagem de Cenários Financeiros',
          description:
            'Permitir a simulação de diferentes resultados financeiros com base em variáveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com Sistemas ERP',
          description:
            'Sincronizar dados de projetos e finanças com SAP, Oracle, Totvs, etc.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Módulo de Reconhecimento de Receita',
          description:
            'Automatizar o reconhecimento contábil da receita com base no progresso do projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Workflow de Aprovação de Orçamento',
          description:
            'Criar um fluxo para que orçamentos departamentais e de projetos sejam aprovados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Variação (Orçado vs. Real)',
          description:
            'Gerar relatórios detalhados que explicam as diferenças entre o planejado e o executado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Planejamento de Pessoal (Headcount)',
          description:
            'Ferramenta para planejar contratações futuras e projetar seus custos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fontes para Dislexia',
          description:
            'Oferecer opções de fontes (como OpenDyslexic) nas configurações de aparência.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração Automática de Alt-text',
          description:
            'Usar IA para descrever imagens anexadas para usuários de leitores de tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Transcrição em Tempo Real',
          description:
            'Integrar transcrição ao vivo em chamadas de vídeo realizadas dentro da plataforma.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Simulador de Daltonismo',
          description:
            'Ferramenta para desenvolvedores e designers visualizarem a interface para daltônicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Exibição de Pronomes no Perfil',
          description:
            'Adicionar um campo para que usuários especifiquem e exibam seus pronomes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Verificador de Linguagem Inclusiva',
          description:
            'Analisar textos para sugerir alternativas a termos que possam ser não-inclusivos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Assistente de Fuso Horário',
          description:
            'Exibir horários de reuniões e prazos no fuso horário local de cada usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Suporte a Idiomas da Direita para a Esquerda (RTL)',
          description:
            'Adaptar toda a interface para funcionar corretamente em idiomas como Árabe e Hebraico.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Preferências de Comunicação',
          description:
            'Permitir que usuários indiquem se preferem comunicação síncrona ou assíncrona.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Legendas Configuráveis',
          description:
            'Permitir que usuários personalizem o tamanho, cor e fundo das legendas de vídeo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Redução de Movimento',
          description:
            'Adicionar uma opção para desativar animações e efeitos de transição na interface.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo de Impressão Otimizado',
          description:
            'Criar estilos CSS específicos para uma impressão limpa e legível de tarefas e relatórios.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sistema de Recompensas por Tokens',
          description:
            'Criar uma "moeda" interna para recompensar contribuições e engajamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Votação Descentralizada (DAO-like)',
          description:
            'Implementar um mecanismo de votação para decisões estratégicas de projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sistema de "Bounties" para Tarefas',
          description:
            'Permitir a criação de tarefas abertas com uma recompensa associada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Contratos Inteligentes para Pagamentos',
          description:
            'Automatizar pagamentos a freelancers quando marcos de projeto são atingidos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pontuação de Reputação Descentralizada',
          description:
            'Calcular uma pontuação de reputação com base em avaliações de pares.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Certificados de Conclusão em NFT',
          description:
            'Gerar certificados únicos e verificáveis para a conclusão de grandes projetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Orçamento Transparente do Projeto',
          description:
            'Criar um registro público e imutável de todas as despesas de um projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Virtualização de Listas Longas (Windowing)',
          description:
            'Implementar `react-window` para renderizar apenas os itens visíveis da lista na tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Tabela com Controles no Cliente',
          description:
            'Criar uma tabela reutilizável com ordenação, filtro e paginação gerenciados no frontend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Skeleton Loading States',
          description:
            'Desenvolver componentes "esqueleto" que simulam a UI final antes do carregamento dos dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sistema de Notificações "Toast"',
          description:
            'Criar um serviço e componente para exibir notificações flutuantes (sucesso, erro, aviso).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Tour Guiado',
          description:
            'Desenvolver um passo a passo interativo para apresentar funcionalidades a novos usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Carregamento Preguiçoso de Abas (Lazy Loading Tabs)',
          description:
            'Fazer com que o conteúdo das abas seja renderizado apenas quando elas são ativadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Rolagem Infinita (Infinite Scroll)',
          description:
            'Implementar a busca e adição de novos itens a uma lista conforme o usuário rola a página.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Visualizador de Diferenças de Texto (Diff Viewer)',
          description:
            'Criar um componente que destaca as alterações entre duas versões de um texto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Linha do Tempo (Timeline)',
          description:
            'Desenvolver uma view para exibir o histórico de atividades em ordem cronológica.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Galeria de Imagens com Lightbox',
          description:
            'Criar um componente que exibe thumbnails e abre imagens em tela cheia (lightbox).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Implementar Cache de API com React Query/SWR',
          description:
            'Adotar uma biblioteca para gerenciar cache, revalidação e estado de requisições.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização de Estado com a URL',
          description:
            'Usar query params para controlar o estado da UI (filtros, abas, paginação).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Error Boundary Global',
          description:
            'Implementar um componente para capturar erros de renderização e exibir uma UI de fallback.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Uso de Web Workers para Cálculos Pesados',
          description:
            'Mover processamento intensivo para uma thread separada para não bloquear a UI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização em Tempo Real com WebSockets',
          description:
            'Conectar a um WebSocket para atualizar a UI instantaneamente com novos dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Otimização de Context API com Seletores',
          description:
            'Usar `use-context-selector` para evitar re-renderizações desnecessárias em consumidores.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Persistência de Estado no LocalStorage',
          description:
            'Salvar estados da UI (ex: filtros, tema) para que se mantenham entre as sessões.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Máquina de Estados para UI Complexa (XState)',
          description:
            'Usar uma máquina de estados para gerenciar fluxos com múltiplos passos e validações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Abstração da Lógica de Dados em Custom Hooks',
          description:
            'Isolar toda a lógica de fetch, cache e manipulação de dados em hooks reutilizáveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Central de Gerenciamento de Uploads',
          description:
            'Criar um estado global para monitorar o progresso de múltiplos uploads de arquivos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Code Splitting por Rota com React.lazy',
          description:
            'Dividir o bundle da aplicação para carregar o código de cada página sob demanda.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Otimização de Imagens com `loading="lazy"`',
          description:
            'Implementar carregamento preguiçoso nativo para imagens abaixo da dobra.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Memoização de Componentes com `React.memo`',
          description:
            'Aplicar memoização em componentes que recebem as mesmas props frequentemente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Bundle com Webpack Bundle Analyzer',
          description:
            'Gerar um mapa visual do bundle para identificar e otimizar as maiores dependências.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pré-carregamento de Rotas (Prefetching)',
          description:
            'Carregar os dados ou o código de uma rota em segundo plano ao passar o mouse sobre um link.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Remoção de CSS Não Utilizado com PurgeCSS',
          description:
            'Configurar o build para remover todos os estilos CSS que não estão sendo usados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Implementar Service Worker para Cache de Assets',
          description:
            'Usar um Service Worker para cachear arquivos estáticos (JS, CSS) e acelerar visitas futuras.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Debounce e Throttle em Manipuladores de Eventos',
          description:
            'Otimizar eventos como busca em inputs e scroll para evitar execuções excessivas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Profiling de Componentes com React DevTools',
          description:
            'Usar o profiler para identificar e corrigir gargalos de renderização na aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Font Subsetting',
          description:
            'Carregar apenas os caracteres de uma fonte que são realmente utilizados na página.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Manter Posição do Scroll ao Voltar',
          description:
            'Salvar e restaurar a posição da rolagem ao navegar entre páginas de lista e detalhe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Optimistic UI Updates"',
          description:
            'Atualizar a UI instantaneamente após uma ação, antes da confirmação do servidor.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de Conexão Offline',
          description:
            'Exibir um alerta global e desabilitar ações quando o usuário perde a conexão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Feedback de "Copiado para Área de Transferência"',
          description:
            'Implementar um botão "Copiar" que exibe uma mensagem de sucesso temporária.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Upload de Arquivos com Arrastar e Soltar (Drag and Drop)',
          description:
            'Criar uma área de drop para upload de arquivos que fornece feedback visual claro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Alerta de Dados Não Salvos ao Sair',
          description:
            'Avisar o usuário caso ele tente sair de uma página com um formulário não salvo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Indicador de Progresso de Leitura (Scroll Spy)',
          description:
            'Exibir uma barra de progresso que acompanha a rolagem em artigos ou documentos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Indicador de Progresso no Favicon',
          description:
            'Mostrar o número de notificações ou um ícone de loading no favicon da aba.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Pull to Refresh" em Listas Mobile',
          description:
            'Implementar o gesto de puxar para baixo para atualizar o conteúdo em dispositivos móveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pré-visualização de Links',
          description:
            'Exibir um card com título, imagem e descrição ao colar um link em um campo de texto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animações de Entrada/Saída de Elementos',
          description:
            'Usar Framer Motion para animar a montagem e desmontagem de componentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animações de Layout',
          description:
            'Animar a reorganização de itens em uma lista quando ela é filtrada ou ordenada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animação de Loading Personalizada com Lottie',
          description:
            'Substituir GIFs por animações vetoriais leves e performáticas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Transições de Página Suaves',
          description:
            'Implementar animações de fade ou slide ao navegar entre as rotas da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Efeito Parallax em Scroll',
          description:
            'Mover elementos em diferentes velocidades durante a rolagem para criar um efeito de profundidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animações Disparadas por Scroll (Scroll-triggered)',
          description:
            'Animar elementos para que apareçam ou se alterem quando entram na tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animação de Preenchimento de Ícones',
          description:
            'Animar um ícone do estado "vazado" para "preenchido" quando ele é ativado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animação de Números em Contadores',
          description:
            'Fazer com que números em dashboards e estatísticas contem do zero até o valor final.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Feedback Visual em Hover States',
          description:
            'Adicionar transições suaves em links e botões para indicar interatividade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animação de Esqueleto para Gráficos',
          description:
            'Criar uma versão animada do skeleton loading específica para dashboards e gráficos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gerenciamento de Foco em Modais e Menus',
          description:
            'Prender o foco do teclado dentro de um modal e devolvê-lo ao local original ao fechar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Anúncio de Mudança de Rota para Leitores de Tela',
          description:
            'Fazer com que o leitor de tela anuncie o título da nova página ao navegar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Link "Pular para o Conteúdo"',
          description:
            'Implementar um link oculto no início da página para pular a navegação principal.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Uso de `aria-live` para Notificações',
          description:
            'Garantir que o conteúdo de alertas e toasts seja lido automaticamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Navegação por Teclado em Componentes Complexos',
          description:
            'Implementar uma alternativa via teclado para ações de arrastar e soltar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Respeito à Preferência de "Movimento Reduzido"',
          description:
            'Desativar animações desnecessárias se o usuário tiver `prefers-reduced-motion` ativado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Testes Automatizados de Acessibilidade no CI/CD',
          description:
            'Integrar `axe-core` nos testes para bloquear regressões de acessibilidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Contraste de Cores Dinâmico',
          description:
            'Calcular e aplicar dinamicamente a cor do texto (preto/branco) sobre fundos coloridos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Rótulos Acessíveis para Campos de Formulário',
          description:
            'Garantir que todos os `inputs` tenham um `label` associado corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Landmark Roles do HTML5',
          description:
            'Utilizar tags como `<main>`, `<nav>`, `<header>` para melhorar a navegação semântica.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Validação em Tempo Real com Feedback Imediato',
          description:
            'Exibir erros ou sucesso de validação assim que o usuário sai de um campo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Máscaras de Input (Telefone, Moeda, CPF)',
          description:
            'Formatar automaticamente a entrada do usuário em campos com padrões específicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Autocomplete (Typeahead)',
          description:
            'Criar um campo de busca que sugere resultados de uma API enquanto o usuário digita.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Upload de Arquivos com Pré-visualização',
          description:
            'Exibir uma miniatura de imagens ou um ícone para outros tipos de arquivo antes do envio.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Editor de Texto Rico (WYSIWYG)',
          description:
            'Integrar um editor como Tiptap ou Quill.js para formatação de texto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Formulário Multi-etapas com Indicador de Progresso',
          description:
            'Dividir formulários longos em passos com uma barra de progresso visual.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Salvamento Automático de Rascunhos',
          description:
            'Salvar o progresso de formulários longos periodicamente no `localStorage`.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Input de Tags com Sugestões',
          description:
            'Criar um campo que transforma texto em tags e sugere tags existentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente "Slider" para Seleção de Intervalo',
          description:
            'Implementar um controle deslizante para selecionar um valor ou um intervalo numérico.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Validação de Força da Senha em Tempo Real',
          description:
            'Mostrar um medidor de força da senha conforme o usuário digita.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sistema de Temas com CSS Variables',
          description:
            'Estruturar todo o CSS para ser customizável via variáveis (cores, fontes, espaçamento).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Seletor de Densidade da UI (Compacto, Normal)',
          description:
            'Permitir que o usuário ajuste o espaçamento da interface para exibir mais ou menos informação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo de Alto Contraste',
          description:
            'Criar um tema específico que atenda aos critérios de acessibilidade para baixa visão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Ajuste Global de Tamanho de Fonte',
          description:
            'Implementar controles para aumentar ou diminuir o tamanho da fonte em toda a aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Exportação/Importação de Configurações da UI',
          description:
            'Permitir que usuários salvem e compartilhem suas preferências de interface.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo Zen / Foco',
          description:
            'Criar um botão que esconde elementos de navegação para focar no conteúdo principal.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização de Preferências entre Dispositivos',
          description:
            'Salvar as configurações de tema e layout na conta do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Internacionalização (i18n) com Troca de Idioma',
          description:
            'Estruturar a aplicação para suportar múltiplos idiomas e permitir a troca em tempo real.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Implementação do `manifest.json` para Instalação',
          description:
            'Adicionar o manifesto para permitir que o app seja instalado na tela inicial (PWA).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Estratégia de Cache Offline (Stale-While-Revalidate)',
          description:
            'Usar um Service Worker para servir conteúdo do cache enquanto busca atualizações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fila de Sincronização em Background',
          description:
            'Salvar ações feitas offline e executá-las automaticamente quando a conexão voltar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Suporte a Gestos (Swipe) em Listas',
          description:
            'Implementar o gesto de arrastar para o lado para revelar ações (excluir, editar).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com API de Compartilhamento Nativo',
          description:
            'Usar a Web Share API para abrir o menu de compartilhamento do sistema operacional.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Splash Screen Personalizada para PWA',
          description:
            'Definir uma tela de abertura customizada para quando o app instalado é iniciado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Vibração Tátil (Haptic Feedback) para Ações',
          description:
            'Usar a Vibration API para dar um feedback físico sutil em ações importantes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Adaptação para Áreas Seguras (Notch)',
          description:
            'Ajustar o layout para evitar que o conteúdo fique sobreposto por recortes da tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Indicador Visual de Status de Sincronização',
          description:
            'Mostrar um ícone na UI que indica o status (online, offline, sincronizando).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Uso da API de Câmera para Upload de Imagens',
          description:
            'Permitir que o usuário tire uma foto e faça o upload diretamente pelo app.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Documentação de Componentes com Storybook',
          description:
            'Criar um ambiente isolado para desenvolver, testar e documentar componentes da UI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Mock de API com Mock Service Worker (MSW)',
          description:
            'Interceptar requisições no nível da rede para desenvolver sem depender do backend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Testes de Regressão Visual',
          description:
            'Implementar testes que comparam screenshots de componentes para detectar mudanças visuais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração Automática de Mocks para Testes',
          description:
            'Usar bibliotecas para criar dados falsos consistentes para testes unitários e de integração.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Scripts de Scaffolding para Novos Componentes',
          description:
            'Criar comandos CLI para gerar a estrutura de arquivos de um novo componente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Deploy de "Preview Environments" por Pull Request',
          description:
            'Configurar o CI/CD para gerar um ambiente de teste com link único para cada PR.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Tipagem Forte para Tokens de Design',
          description:
            'Usar TypeScript para tipar as variáveis de CSS (cores, fontes) e obter autocomplete.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração do React DevTools com Testes',
          description:
            'Usar a API do DevTools para inspecionar e depurar a árvore de componentes em testes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Documentação de Arquitetura com ADRs',
          description:
            'Manter um registro versionado das decisões arquiteturais importantes do frontend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Cobertura de Testes',
          description:
            'Gerar e analisar relatórios de cobertura de testes para identificar áreas não testadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Hotswapping de Módulos Configurado (HMR)',
          description:
            'Garantir que as alterações no código sejam refletidas no navegador sem recarregar a página.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Criação de um CLI Interno para o Frontend',
          description:
            'Desenvolver uma ferramenta de linha de comando para automatizar tarefas comuns do projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Implementação de Arquitetura de Micro-frontends com Module Federation',
          description:
            'Configurar Webpack para carregar e compartilhar componentes em tempo de real.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Adoção de Arquitetura "Islands"',
          description:
            'Usar um framework como Astro para enviar zero JavaScript por padrão e hidratar componentes de forma isolada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Implementação de React Server Components (RSC)',
          description:
            'Refatorar partes da UI para serem renderizadas no servidor, reduzindo o bundle do cliente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Estratégia de Hidratação Progressiva',
          description:
            'Hidratar componentes críticos primeiro, deixando os menos importantes para depois.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Criação de um "Design System" Multi-marca',
          description:
            'Arquitetar o sistema de temas para suportar múltiplas marcas com tokens de design diferentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Padrão de Componentes "Renderless"',
          description:
            'Criar componentes que encapsulam lógica de estado e comportamento sem renderizar nenhuma UI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Adoção de CSS-in-JS com "Zero-Runtime"',
          description:
            'Migrar para uma biblioteca (ex: Linaria) que extrai todo o CSS em tempo de compilação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Estratégia de Gerenciamento de Estado com "Atoms"',
          description:
            'Usar uma biblioteca como Jotai ou Recoil para um gerenciamento de estado mais granular e otimizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Normalização de Dados da API no Cliente',
          description:
            'Transformar respostas de API aninhadas em um formato de "tabela" para facilitar o gerenciamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Padrão "Command" para Ações de Desfazer/Refazer',
          description:
            'Implementar uma pilha de comandos para gerenciar o histórico de ações do usuário de forma robusta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Criação de Codemods para Refatoração Automática',
          description:
            'Desenvolver scripts (jscodeshift) para automatizar atualizações e refatorações no código.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Extensão para o Chrome DevTools Específica da Aplicação',
          description:
            'Criar uma aba no DevTools para inspecionar e depurar o estado da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Linter de CSS-in-JS Customizado',
          description:
            'Desenvolver regras de ESLint para garantir o uso correto dos tokens de design.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração de Documentação a partir de TSDoc',
          description:
            'Configurar uma ferramenta para gerar um site de documentação a partir dos comentários do código.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Script para Detecção de "Prop Drilling"',
          description:
            'Criar uma análise estática para identificar componentes que passam props por muitos níveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'CLI para Gerenciamento de Traduções (i18n)',
          description:
            'Desenvolver um CLI para encontrar chaves de tradução faltantes ou não utilizadas no projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sistema de Mock de Dados Declarativo',
          description:
            'Usar schemas (GraphQL, Zod) para gerar dados de mock consistentes para desenvolvimento e testes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Análise de Performance de Renderização no CI',
          description:
            'Integrar ferramentas para medir e alertar sobre regressões de performance em PRs.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Validação de Tamanho do Bundle por Componente',
          description:
            'Criar um hook de pré-commit que impede a adição de dependências muito pesadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Logger" de Eventos de Frontend com Replay',
          description:
            'Implementar um logger que permite reproduzir a sessão do usuário em modo de desenvolvimento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Prevenção de "Flash of Unstyled Content" (FOUC)',
          description:
            'Garantir que o conteúdo só seja exibido após o carregamento do CSS crítico.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Scroll Anchoring',
          description:
            'Utilizar a propriedade overflow-anchor para evitar que a página "pule" durante o carregamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Prevenção de Submissões Duplas',
          description:
            'Desabilitar e adicionar um estado de loading a botões imediatamente após o clique.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Exibição de Contagem de Caracteres Restantes',
          description:
            'Adicionar um contador em tempo real em campos de texto com limite de caracteres.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Infinite Scroll" Bidirecional',
          description:
            'Permitir o carregamento de itens mais antigos (para baixo) e mais novos (para cima).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Salvar Estado da Interface do Usuário',
          description:
            'Persistir no localStorage a largura e ordem de colunas de tabelas ou o estado de sidebars.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animação de Foco em Inputs',
          description:
            'Adicionar uma micro-interação sutil (ex: animação na borda) quando um campo recebe foco.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Padrão "Skeleton" sobre Conteúdo Antigo',
          description:
            'Ao recarregar dados, exibir o "esqueleto" sobre o conteúdo antigo para uma transição mais suave.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Implementação do padrão "Toast" para Ações em Fila',
          description:
            'Agrupar múltiplas notificações "toast" em uma única, que pode ser expandida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Atalhos de Teclado Sequenciais',
          description:
            'Implementar atalhos de duas etapas, como no GitHub (ex: pressionar "g" e depois "n").',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Formulário com Campos Condicionais Dinâmicos',
          description:
            'Montar e desmontar campos de formulário com base nos valores de outros campos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Validação "Cross-Field"',
          description:
            'Implementar validações onde um campo depende do valor de outro (ex: "confirmar senha").',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Wizard" com Navegação Livre entre Passos',
          description:
            'Permitir que o usuário pule entre as etapas de um formulário multi-passos sem perder dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Input com "Paste" de Imagem',
          description:
            'Permitir que o usuário cole uma imagem da área de transferências diretamente em um campo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Construtor de Regras/Filtros',
          description:
            'Desenvolver uma UI para que usuários criem regras complexas (ex: "SE [campo] CONTÉM [valor]").',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Gerenciamento de "Arrays" de Campos Dinâmicos',
          description:
            'Criar uma interface para adicionar, remover e reordenar conjuntos de campos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Validação Assíncrona com Feedback de Loading',
          description:
            'Mostrar um indicador de carregamento enquanto valida um campo no servidor (ex: nome de usuário).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização do Estado de Formulários entre Abas',
          description:
            'Usar um Broadcast Channel para manter formulários idênticos sincronizados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Input de Cor com Suporte a Canal Alfa',
          description:
            'Criar um seletor de cores que permite ajustar a transparência.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Edição "In-place"',
          description:
            'Permitir que o usuário clique em um texto para transformá-lo em um campo de input editável.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização de Dados Diferencial',
          description:
            'Enviar ao servidor apenas as mudanças (diffs), em vez do objeto de dados completo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Estratégia de Resolução de Conflitos de Edição',
          description:
            'Implementar uma UI para que o usuário resolva conflitos quando dados são editados offline.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração de IDs Temporários no Cliente',
          description:
            'Criar itens offline com IDs provisórios que são substituídos após a sincronização.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Prefetching" Inteligente de Dados para Uso Offline',
          description:
            'Baixar proativamente os dados que o usuário provavelmente precisará acessar offline.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'UI Adaptativa para o Modo Offline',
          description:
            'Alterar a interface para indicar claramente quais funcionalidades estão indisponíveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Banco de Dados no Navegador com IndexedDB',
          description:
            'Usar uma abstração como Dexie.js para armazenar dados complexos offline.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Fila de Mutações com Retry Automático',
          description:
            'Criar uma fila de ações do usuário que são reenviadas com "exponential backoff" em caso de falha.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Renderização de Estrutura de Árvore (Tree View) Otimizada',
          description:
            'Implementar virtualização para árvores com milhares de nós, renderizando apenas os visíveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Tabela Dinâmica (Pivot Table)',
          description:
            'Desenvolver uma tabela que permite ao usuário agregar e cruzar dados no cliente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Busca por Aproximação (Fuzzy Search)',
          description:
            'Implementar uma busca que encontra resultados mesmo com erros de digitação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Componente de Calendário com Eventos Sobrepostos',
          description:
            'Desenvolver a lógica para calcular e renderizar corretamente eventos que ocorrem no mesmo horário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Filtragem por Facetas com Contagem',
          description:
            'Criar um sistema de filtros que exibe a contagem de resultados para cada opção.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Reordenação de Listas Aninhadas com Drag-and-Drop',
          description:
            'Implementar a lógica para reordenar itens dentro e entre diferentes níveis de uma lista.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Visualizador e Editor de JSON',
          description:
            'Criar um componente com syntax highlighting e validação para editar estruturas JSON.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Folha de Estilos Específica para Impressão',
          description:
            'Criar um @media print que formata a página para uma leitura otimizada no papel.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Controle de Quebra de Página em Tabelas Longas',
          description:
            'Usar CSS (page-break-inside) para evitar que linhas de tabelas sejam cortadas entre páginas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Adição de Informações de Contexto na Impressão',
          description:
            'Incluir dinamicamente o URL da página e a data de impressão no cabeçalho ou rodapé.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Modo "Print Preview" na Aplicação',
          description:
            'Criar uma visualização que mostra como a página ficará antes de enviar para a impressora.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Exportação de Dados para CSV com Caracteres Especiais',
          description:
            'Garantir que a exportação lide corretamente com acentuação, vírgulas e outros caracteres.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Geração de Relatórios em PDF no Cliente',
          description:
            'Usar jsPDF para criar um PDF a partir do HTML de um componente de relatório.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Uso da "CSS Custom Paint API" (Houdini)',
          description:
            'Criar efeitos de background e borda customizados que são mais performáticos que imagens.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Implementação da "Portals API"',
          description:
            'Renderizar um componente em uma parte diferente da árvore DOM para criar UIs flutuantes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Uso da "Web Locks API"',
          description:
            'Coordenar tarefas assíncronas entre abas para evitar condições de corrida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Adaptação da UI com "Compute Pressure API"',
          description:
            'Reduzir a complexidade da UI (ex: desativar animações) quando o sistema está sobrecarregado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Pré-renderização com "Speculation Rules API"',
          description:
            'Informar ao navegador quais páginas o usuário provavelmente visitará para pré-renderizá-las.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animações de Transição de Estado com "View Transitions API"',
          description:
            'Criar transições animadas suaves entre estados da UI sem uma biblioteca externa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Renderização Gráfica com "WebGPU API"',
          description:
            'Utilizar a próxima geração de API gráfica para visualizações 3D de alta performance.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de Inatividade com "Idle Detection API"',
          description:
            'Realizar ações (ex: salvar rascunho, mostrar pop-up) quando o usuário está inativo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Monitoramento com "Performance Timeline API"',
          description:
            'Medir com precisão a performance de interações e eventos específicos do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Coleta de Relatórios com "Reporting API"',
          description:
            'Configurar o navegador para enviar relatórios de violações de CSP, crashes e outros problemas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Uso da "VirtualKeyboard API"',
          description:
            'Controlar a exibição do teclado virtual em dispositivos móveis para uma melhor UX.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Integração com a "Web Authentication API" (WebAuthn)',
          description:
            'Implementar login sem senha usando biometria (Face ID, impressão digital) ou chaves de segurança.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Picture-in-Picture API" para Elementos HTML',
          description:
            'Permitir que não apenas vídeos, mas qualquer elemento HTML flutue em uma janela PiP.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Acesso ao Sistema de Arquivos com "File System Access API"',
          description:
            'Permitir que a aplicação web abra, edite e salve arquivos diretamente no computador do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de Forma com "Shape Detection API"',
          description:
            'Identificar rostos, códigos de barras e texto em imagens via APIs nativas do navegador.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Sincronização em Background com "Periodic Background Sync API"',
          description:
            'Permitir que o PWA sincronize dados periodicamente, mesmo quando não está em uso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Alvo de Compartilhamento com "Web Share Target API"',
          description:
            'Transformar o PWA em um alvo no menu de compartilhamento nativo do sistema operacional.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Notificações Push com "Badging API"',
          description:
            'Exibir um contador numérico (badge) no ícone do PWA na tela inicial.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Reconhecimento de Conteúdo com "Content Picker API"',
          description:
            'Abrir um seletor nativo para que o usuário escolha contatos, arquivos, etc.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Streaming de Requisições com "Fetch API"',
          description:
            'Processar grandes respostas de API em partes (chunks) conforme elas chegam, sem esperar o fim.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animações em "Off-Main-Thread" com Web Animations API',
          description:
            'Executar animações em uma thread separada para garantir que elas permaneçam fluidas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"CSS @scope"',
          description:
            'Utilizar a nova regra @scope para aplicar estilos a uma subárvore específica do DOM sem vazar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Declarative Shadow DOM"',
          description:
            'Renderizar componentes encapsulados com Shadow DOM diretamente do HTML do servidor.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de Região de Interesse com a "Compute Pressure API"',
          description:
            'Priorizar o carregamento e a renderização de partes da tela onde o usuário está olhando (com Highware compatível).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Otimização de Layout com "CSS Anchor Positioning"',
          description:
            'Ancorar elementos (como tooltips) a outros, garantindo que permaneçam visíveis na tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'API de Notificação de Tarefas do Usuário (Task Scheduling API)',
          description:
            'Utilizar scheduler.postTask para priorizar tarefas de JavaScript e evitar o bloqueio da thread principal.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Consumo de Streams "Readable"',
          description:
            'Processar dados de streaming para funcionalidades como download progressivo ou chats.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Customização de Elementos de Formulário',
          description:
            'Estilizar elementos nativos como <select> e <input type="date"> de forma mais robusta e consistente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Animações com "Scroll-driven Animations"',
          description:
            'Vincular o progresso de uma animação diretamente à posição de rolagem da página.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de Latência de Input com a "Event Timing API"',
          description:
            'Medir e otimizar o tempo de resposta a interações do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"Temporal API" para Datas e Horas',
          description:
            'Refatorar o código legado de manipulação de datas para usar a nova e mais robusta API Temporal.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Renderização Condicional com a "Selectability API"',
          description:
            'Otimizar a renderização de componentes com base na visibilidade e selecionabilidade do texto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Detecção de "User Activation"',
          description:
            'Utilizar a API para verificar se uma ação foi iniciada por um gesto real do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"CSS prefers-reduced-data" Media Query',
          description:
            'Adaptar a aplicação para carregar menos dados (ex: imagens de menor qualidade) se o usuário estiver em modo de economia.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: '"CSS text-wrap: balance"',
          description:
            'Utilizar a nova propriedade CSS para balancear automaticamente o número de caracteres por linha em títulos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },

        {
          name: 'Inicializar o Projeto com Vite',
          description:
            'Executar npm create vite@latest com o template react-ts.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar o tsconfig.json',
          description:
            'Habilitar strict mode e configurar paths para importações absolutas (ex: @/*).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Instalar e Configurar ESLint',
          description:
            'Adicionar plugins para React, Hooks, JSX-A11y e TypeScript para garantir a qualidade do código.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Instalar e Configurar Prettier',
          description:
            'Definir regras de formatação e integrar com o ESLint para evitar conflitos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar Hooks de Pré-Commit',
          description:
            'Usar Husky e lint-staged para rodar lint e formatação antes de cada commit.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Padronizar Mensagens de Commit',
          description:
            'Implementar commitlint para forçar o padrão de Commits Semânticos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar "Aliases" de Path no Vite',
          description:
            'Editar vite.config.ts para que o Vite entenda os caminhos absolutos definidos no tsconfig.json.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir Variáveis de Ambiente',
          description:
            'Criar arquivos .env, .env.development, .env.production e um .env.example.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar Proxy de Desenvolvimento',
          description:
            'Editar vite.config.ts para redirecionar chamadas de API (ex: /api) para o backend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Adicionar Utilitário de Classes Condicionais',
          description:
            'Instalar clsx ou classnames para facilitar a aplicação de classes CSS.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Adicionar Script de Verificação de Tipos',
          description:
            'Criar um comando npm run type-check que executa tsc --noEmit.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Adicionar Visualizador de Bundle',
          description:
            'Instalar rollup-plugin-visualizer para gerar um mapa interativo do bundle final.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Instalar e Configurar o React Router',
          description:
            'Adicionar react-router-dom e criar a estrutura inicial de rotas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Escolher e Configurar a Estratégia de CSS',
          description:
            'Instalar e configurar Tailwind CSS, Styled Components, ou a solução de CSS-in-JS escolhida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar Linter de CSS',
          description:
            'Instalar stylelint para padronizar e evitar erros no código CSS/SCSS.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Instalar Storybook',
          description:
            'Adicionar e configurar o Storybook para documentar e desenvolver componentes de forma isolada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar Mock de API com MSW',
          description:
            'Instalar e configurar o Mock Service Worker para desenvolver o frontend sem depender do backend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar CHANGELOG.md',
          description:
            'Iniciar o arquivo de log de mudanças e definir um processo para atualizá-lo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Dockerfile para o Frontend',
          description:
            'Desenvolver um Dockerfile multi-stage para build e deploy da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar Pipeline de CI Inicial',
          description:
            'Criar um work.High no GitHub Actions/GitLab CI que roda lint, testes e build a cada PR.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Adicionar Gerador de sitemap.xml',
          description:
            'Configurar vite-plugin-sitemap para gerar o sitemap automaticamente no build.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Otimizar o index.html',
          description:
            'Adicionar meta tags essenciais (charset, viewport,                description, theme-color).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar HTTPS para Desenvolvimento Local',
          description:
            'Usar vite-plugin-mkcert para ter um certificado SSL válido em localhost.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Adicionar Verificador de Dependências',
          description:
            'Configurar depcheck para encontrar dependências não utilizadas no projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar um README.md Detalhado',
          description:
            'Documentar como instalar, rodar, testar e contribuir com o projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir a Estrutura de Pastas FrontEnd',
          description:
            'Decidir e criar a arquitetura de diretórios (ex: por feature, por tipo de arquivo).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar o Roteador Principal',
          description:
            'Criar um componente central (AppRoutes.tsx) que define todas as rotas da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componentes de Layout',
          description:
            'Desenvolver os layouts principais (ex: PublicLayout, PrivateLayout com sidebar).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar um ErrorBoundary Global',
          description:
            'Criar um componente que captura erros de renderização e exibe uma tela de erro amigável.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar um Suspense com Fallback Customizado',
          description:
            'Desenvolver um componente de loading padrão para ser usado com React.lazy.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir a Estratégia de Code Splitting',
          description:
            'Usar React.lazy() para dividir o código por rota desde o início.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar o Diretório de Hooks Customizados',
          description:
            'Estruturar a pasta src/hooks para abrigar toda a lógica reutilizável.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar o Diretório de Utilitários',
          description:
            'Estruturar a pasta src/lib ou src/utils para funções puras e auxiliares.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar a Página 404',
          description:
            'Criar o componente e a rota para páginas não encontradas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente para Gerenciar o <head>',
          description:
            'Usar react-helmet-async para gerenciar o <title> e meta tags de cada página.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar o Diretório de Tipos Globais',
          description:
            'Estruturar a pasta src/types para interfaces e tipos compartilhados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar um Provider Global',
          description:
            'Criar um AppProvider que agrupa todos os providers da aplicação (tema, rotas, estado).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Estruturar o Diretório de Assets',
          description:
            'Organizar as pastas para imagens, fontes, ícones SVG, etc.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir Padrões de Nomenclatura',
          description:
            'Documentar como arquivos, componentes e variáveis devem ser nomeados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar um Serviço de Logging',
          description:
            'Desenvolver um wrapper para console.log que pode ser desativado em produção.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar um Componente de Loading de Página',
          description:
            'Criar um spinner de tela cheia para ser usado durante transições de página ou carregamento inicial.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir Estratégia de Constantes',
          description:
            'Criar um diretório src/constants para armazenar valores fixos da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar a Página de Manutenção',
          description:
            'Desenvolver uma página para ser exibida durante períodos de manutenção programada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar um Componente de Rota Privada',
          description:
            'Criar um wrapper de rota que verifica a autenticação antes de renderizar um componente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Desenvolver um Componente de Rota Pública',
          description:
            'Criar um wrapper de rota que redireciona usuários autenticados (ex: da página de login para o dashboard).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir o "Entrypoint" da Aplicação',
          description: 'Configurar o main.tsx com os providers e o roteador.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Estruturar a Pasta de Features/Módulos',
          description:
            'Criar diretórios para cada grande funcionalidade da aplicação (ex: src/features/dashboard).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar a Estrutura de Testes',
          description:
            'Organizar os arquivos de teste (.test.tsx, .spec.tsx) junto aos componentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir a Estratégia de Dados Iniciais (Mock)',
          description:
            'Criar um diretório src/mocks para abrigar os handlers do MSW.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar um Componente PageWrapper',
          description:
            'Desenvolver um componente que encapsula o layout padrão de uma página (título, padding, etc.).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar o "Theme Provider"',
          description:
            'Implementar o provider de tema para distribuir os tokens de design via contexto ou variáveis CSS.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir os Tokens de Design',
          description:
            'Criar um arquivo (theme.ts) com cores, tipografia, espaçamentos e sombras.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Button',
          description:
            'Desenvolver o botão com variantes, tamanhos e estados (loading, disabled).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Input',
          description:
            'Desenvolver o campo de texto com estados (foco, erro), ícones e variantes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componentes Checkbox e Radio',
          description:
            'Desenvolver os componentes de seleção garantindo a acessibilidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Select',
          description: 'Desenvolver um dropdown customizado e acessível.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Modal',
          description:
            'Desenvolver um modal que gerencia o foco e o scroll do background.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Tooltip',
          description:
            'Desenvolver uma dica de contexto que aparece ao passar o mouse.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Spinner',
          description:
            'Desenvolver o indicador de carregamento padrão da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componentes de Layout (Grid, Stack)',
          description:
            'Desenvolver componentes para organizar o layout de forma consistente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Avatar',
          description:
            'Desenvolver o componente para exibir imagens de perfil com fallback para iniciais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Badge',
          description: 'Desenvolver um marcador para status ou notificações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Alert',
          description:
            'Desenvolver um banner de alerta com variantes de severidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Tabs',
          description:
            'Desenvolver um sistema de abas para navegação de conteúdo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Accordion',
          description:
            'Desenvolver um componente de conteúdo sanfonado (expansível).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Breadcrumbs',
          description:
            'Desenvolver o componente de navegação que indica a localização do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Pagination',
          description:
            'Desenvolver o controle de paginação para listas e tabelas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Typography',
          description:
            'Criar um componente para padronizar todos os textos da aplicação (h1, p, span).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Link',
          description:
            'Criar um wrapper para o Link do React Router que aplica os estilos do design system.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente de Ícone',
          description:
            'Criar um wrapper para uma biblioteca de ícones SVG (ex: lucide-react).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Aplicar um Reset/Normalize CSS',
          description:
            'Adicionar um arquivo CSS para zerar os estilos padrão do navegador.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Documentar Componentes no Storybook',
          description:
            'Criar "stories" para cada componente base com seus controles e variações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Card',
          description: 'Desenvolver um contêiner padrão para agrupar conteúdo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Skeleton',
          description: 'Desenvolver o componente de esqueleto de carregamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Switch',
          description: 'Desenvolver o componente de toggle (liga/desliga).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente DatePicker',
          description:
            'Desenvolver ou customizar uma biblioteca de seletor de datas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Textarea',
          description:
            'Desenvolver a área de texto, opcionalmente com auto-resize.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente ProgressBar',
          description: 'Desenvolver a barra de progresso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Table',
          description:
            'Desenvolver a estrutura e estilos base para tabelas de dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente FormLabel',
          description: 'Desenvolver um componente de rótulo para formulários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente FormErrorMessage',
          description:
            'Desenvolver um componente para exibir mensagens de erro em formulários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Drawer',
          description:
            'Desenvolver um painel lateral que desliza para exibir conteúdo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Popover',
          description:
            'Desenvolver uma caixa de conteúdo flutuante que aparece ao clicar em um gatilho.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Menu',
          description: 'Desenvolver um menu dropdown com itens de ação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Componente Separator',
          description:
            'Desenvolver uma linha divisória para separar seções de conteúdo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Escolher e Instalar Biblioteca de Estado Global',
          description:
            'Decidir e instalar Zustand, Redux Toolkit, Jotai ou Recoil.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar o "Store" ou "Providers" de Estado',
          description:
            'Criar a configuração inicial do gerenciador de estado escolhido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Camada de Serviço de API',
          description:
            'Desenvolver um client HTTP com axios ou fetch para centralizar as chamadas de API.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar Interceptors do HTTP Client',
          description:
            'Adicionar interceptors para injetar tokens de autenticação e tratar erros 401/403.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Biblioteca de Cache de Servidor',
          description:
            'Instalar e configurar React Query ou SWR para gerenciar o estado do servidor.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Hooks de API Customizados',
          description:
            'Desenvolver hooks (useUsers, useProjects) que encapsulam as chamadas com React Query.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir Estratégia de Invalidação de Cache',
          description:
            'Planejar como e quando invalidar o cache após mutações (POST, PUT, DELETE).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar "Infinite Query"',
          description:
            'Criar a lógica de paginação com "carregar mais" usando a funcionalidade da biblioteca.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Gerenciar Estado de Notificações Globais',
          description:
            'Criar um "store" para controlar a exibição e o conteúdo de notificações "toast".',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar "Store" de Sessão do Usuário',
          description:
            'Desenvolver um "store" para armazenar informações do usuário autenticado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar "Store" de UI',
          description:
            'Desenvolver um "store" para controlar o estado de elementos da UI (ex: sidebar aberta/fechada).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Tratamento de Erros de API',
          description:
            'Criar uma função utilitária para extrair e formatar mensagens de erro da API.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar "Optimistic Updates"',
          description:
            'Desenvolver a lógica para atualizar a UI antes da confirmação do servidor em mutações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Hook useDebounce',
          description:
            'Desenvolver um hook para atrasar a execução de uma função (ex: em buscas).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Hook useLocalStorage',
          description:
            'Desenvolver um hook que sincroniza um estado com o localStorage.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Hook useOnlineStatus',
          description:
            'Desenvolver um hook que retorna o status da conexão do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Configurar DevTools para a Biblioteca de Estado',
          description:
            'Integrar as extensões de navegador para depurar o estado da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Desenvolver um Hook useMediaQuery',
          description:
            'Criar um hook para reagir a mudanças no tamanho da viewport.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar "Polling" com React Query',
          description:
            'Configurar o refetchInterval para dados que precisam ser atualizados periodicamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Definir Estrutura de Tipos para Payloads de API',
          description:
            'Criar interfaces TypeScript para as respostas e requisições de cada endpoint.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar a Página de Login',
          description:
            'Desenvolver o formulário de login com campos de e-mail e senha.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar a Página de Registro',
          description: 'Desenvolver o formulário de criação de nova conta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar a Página de "Esqueci minha Senha"',
          description:
            'Desenvolver o formulário para solicitar a redefinição de senha.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar a Página de Redefinição de Senha',
          description:
            'Desenvolver o formulário para definir uma nova senha a partir de um token.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Lógica de Login',
          description:
            'Criar a mutação de login, salvar o token e redirecionar o usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Lógica de Logout',
          description:
            'Criar a função de logout, limpar o token e o estado do usuário, e redirecionar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Gerenciar a Persistência do Token',
          description:
            'Decidir e implementar como o token será armazenado de forma segura (ex: cookies).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Proteger Rotas da Aplicação',
          description:
            'Usar o componente PrivateRoute para proteger o acesso a páginas privadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Buscar Dados do Usuário na Inicialização',
          description:
            'Implementar a lógica para buscar os dados do usuário se um token existir.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Redirecionar Usuários Autenticados',
          description:
            'Usar o componente PublicRoute para redirecionar usuários logados da página de login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar a Página de Verificação de E-mail',
          description:
            'Desenvolver uma tela instruindo o usuário a verificar seu e-mail.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Lógica de "Lembrar-me"',
          description:
            'Adicionar um checkbox no login para controlar a expiração da sessão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Login Social (Google, GitHub)',
          description:
            'Desenvolver os botões e o fluxo de redirecionamento para autenticação OAuth.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar a Página de Callback do OAuth',
          description:
            'Desenvolver a página que recebe o código do provedor e finaliza o login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Renovação Silenciosa de Token',
          description:
            'Criar a lógica para renovar o token de acesso em background antes que ele expire.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Criar Hook useAuth',
          description:
            'Desenvolver um hook que provê o estado de autenticação e as funções de login/logout.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Implementar Controle de Acesso Baseado em Papéis (RBAC)',
          description:
            'Criar um componente ou hook que renderiza conteúdo condicionalmente com base no papel do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Desenvolver a Página de Perfil do Usuário',
          description:
            'Criar a tela onde o usuário pode ver e editar suas informações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Desenvolver a Funcionalidade de Troca de Senha',
          description:
            'Criar o formulário para que um usuário logado possa alterar sua senha.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },
        {
          name: 'Exibir o Usuário Logado no Layout',
          description:
            'Adicionar o nome/avatar do usuário e o botão de logout no header da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.High,
        },

        {
          name: 'Configurar Vitest e React Testing Library',
          description:
            'Instalar e configurar o ambiente de testes unitários e de componentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever Testes Unitários para Funções Utilitárias',
          description: 'Testar a lógica pura em src/lib e src/utils.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever Testes para Hooks Customizados',
          description: 'Testar o comportamento de hooks de forma isolada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever Testes de Componentes Base',
          description:
            'Testar a renderização e interação dos componentes do design system.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Mocks Globais para Testes',
          description:
            'Criar um arquivo de setup para mockar APIs (ex: matchMedia, IntersectionObserver).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Instalar e Configurar Cypress ou Playwright',
          description:
            'Adicionar e configurar a ferramenta de testes End-to-End (E2E).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever o Primeiro Teste E2E (Fluxo de Login)',
          description:
            'Criar um teste que simula o login de um usuário na aplicação real.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Integrar Testes no Pipeline de CI',
          description:
            'Adicionar um passo no workfMedium de CI para rodar todos os testes automaticamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Cobertura de Testes',
          description:
            'Gerar relatórios de cobertura para identificar áreas não testadas do código.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever Testes de Acessibilidade',
          description:
            'Usar jest-axe para verificar violações de acessibilidade nos testes de componentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Testes de Regressão Visual',
          description:
            'Instalar e configurar uma ferramenta (ex: Playwright, Percy) para comparar screenshots.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Mockar o Router em Testes de Componentes',
          description:
            'Criar um wrapper para prover o contexto do roteador em testes que o utilizam.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Mockar a API nos Testes E2E',
          description:
            'Usar cy.intercept() ou similar para controlar as respostas da API nos testes E2E.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever Testes para Tratamento de Erros',
          description:
            'Testar os cenários onde a API retorna erros e a UI reage corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Análise Estática de Código no CI',
          description:
            'Integrar SonarQube ou similar para uma análise mais profunda da qualidade do código.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Testes para Validação de Formulários',
          description:
            'Testar todos os cenários de validação (campos obrigatórios, formatos inválidos).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever Testes para o Roteamento',
          description:
            'Criar testes que verificam se a navegação entre páginas está funcionando.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Mockar o Tempo (Date) em Testes',
          description:
            'Usar vi.useFakeTimers() para controlar o tempo em testes de funcionalidades temporais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Comandos Customizados no Cypress/Playwright',
          description:
            'Desenvolver comandos reutilizáveis (ex: cy.login()) para simplificar os testes E2E.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Definir uma Meta de Cobertura de Testes',
          description:
            'Estabelecer um percentual mínimo de cobertura a ser mantido pelo projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o build no vite.config.ts',
          description:
            'Otimizar as configurações de build (minificação, chunking, etc.).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar o WorkfMedium de Deploy Contínuo (CD)',
          description:
            'Desenvolver o pipeline que faz o deploy para um ambiente (staging/produção) automaticamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar uma Hospedagem Estática',
          description:
            'Fazer o deploy da aplicação em um serviço como Vercel, Netlify ou AWS S3/CloudFront.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Otimização de Imagens',
          description:
            'Usar vite-plugin-image-optimizer ou similar para comprimir imagens no build.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Analisar a Performance de Carregamento',
          description:
            'Usar Lighthouse ou PageSpeed Insights para medir e otimizar as métricas (LCP, FCP).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Cache do Navegador',
          description:
            'Definir os headers de cache corretos para os assets da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar um Service Worker com Vite PWA',
          description:
            'Configurar o plugin para transformar a aplicação em um Progressive Web App.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar um CDN',
          description:
            'Garantir que os assets estáticos sejam servidos por uma Content Delivery Network.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Monitoramento de Performance (RUM)',
          description:
            'Integrar uma ferramenta de Real User Monitoring (ex: Datadog, Sentry) para monitorar a performance em produção.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Análise de Tráfego (Analytics)',
          description: 'Integrar Google Analytics, Plausible ou similar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Regras de Redirecionamento',
          description:
            'Criar as regras de redirecionamento necessárias na plataforma de hospedagem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Otimizar Fontes da Web',
          description:
            'Garantir que as fontes sejam carregadas de forma eficiente (ex: font-display: swap).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Minificar e Comprimir Assets',
          description:
            'Garantir que o processo de build está minificando JS/CSS e usando compressão (Gzip/Brotli).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar "Tree Shaking"',
          description:
            'Revisar o código e as configurações de build para garantir a remoção de código não utilizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Headers de Segurança',
          description:
            'Configurar os headers HTTP de segurança (CSP, HSTS, X-Frame-Options) na hospedagem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Health Check para a Aplicação',
          description:
            'Configurar um endpoint que pode ser usado para verificar se a aplicação está no ar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Otimizar o "Time to Interactive" (TTI)',
          description: 'Analisar e adiar a execução de scripts não essenciais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Domínios Customizados',
          description:
            'Apontar o domínio da aplicação para o serviço de hospedagem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar uma Estratégia de "Blue-Green Deployment"',
          description:
            'Configurar o pipeline de CD para permitir deploys sem downtime.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Versionar o Build',
          description:
            'Incluir o hash do commit ou a versão da release no nome do build para fácil identificação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar a Página do Dashboard Principal',
          description:
            'Desenvolver a primeira tela que o usuário vê após o login, com widgets e informações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Funcionalidade de Busca Global',
          description:
            'Implementar um campo de busca no header que pesquisa em toda a aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar a Página de Configurações do Usuário',
          description:
            'Desenvolver a tela para o usuário alterar suas preferências (tema, idioma, notificações).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Funcionalidade de Troca de Tema',
          description:
            'Conectar o seletor de tema (claro/escuro) ao ThemeProvider da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Funcionalidade de Troca de Idioma',
          description: 'Conectar o seletor de idioma ao provider de i18n.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Desenvolver o CRUD de uma Feature Principal (ex: Projetos)',
          description:
            'Criar a lista, o formulário de criação, a página de detalhes e a edição da feature.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar Filtros na Página de Lista',
          description:
            'Adicionar filtros (por status, por data) na página de listagem da feature principal.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar Ordenação na Página de Lista',
          description:
            'Permitir que o usuário ordene a lista clicando nos cabeçalhos da tabela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Ação de Exclusão com Modal de Confirmação',
          description:
            'Garantir que a ação de excluir um item exiba um modal de confirmação antes de prosseguir.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Desenvolver a Seção de Ajuda ou FAQ',
          description:
            'Criar uma página estática ou com um accordion contendo perguntas frequentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar a Página "Sobre Nós" e "Contato"',
          description: 'Desenvolver as páginas institucionais da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Central de Notificações',
          description:
            'Criar um ícone no header que abre um popover com as notificações recentes do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar a Página de Perfil Público (se aplicável)',
          description:
            'Desenvolver a página que exibe as informações públicas de um usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Funcionalidade de Upload de Avatar',
          description:
            'Adicionar o campo de upload de imagem na página de perfil, com pré-visualização.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Desenvolver um Feed de Atividades Recentes',
          description:
            'Criar um componente no dashboard que exibe as últimas ações realizadas no sistema.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar a Funcionalidade de Convidar Membros para uma Equipe',
          description:
            'Desenvolver o formulário para enviar convites por e-mail.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Gráficos e Visualizações para o Dashboard',
          description:
            'Integrar uma biblioteca de gráficos (ex: Recharts, Chart.js) para exibir dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Política de Privacidade e os Termos de Serviço',
          description:
            'Criar as páginas e garantir que o usuário aceite os termos durante o registro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Desenvolver um Chat ou Sistema de Comentários',
          description:
            'Implementar a UI para uma funcionalidade de comunicação em tempo real.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar a Página de Faturamento ou Assinatura',
          description:
            'Desenvolver a tela onde o usuário pode ver seu plano e gerenciar sua assinatura.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Instalar a React Testing Library (RTL)',
          description:
            'Executar npm install -D @testing-library/react @testing-library/jest-dom.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Ambiente de Teste',
          description:
            'Criar o arquivo vitest.config.ts e configurar o environment para jsdom.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Arquivo de Setup para Testes',
          description:
            'Criar um arquivo src/setupTests.ts para importar matchers do @testing-library/jest-dom.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Apontar para o Arquivo de Setup',
          description:
            'Referenciar o setupTests.ts na configuração setupFiles do vitest.config.ts.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Scripts de Teste no package.json',
          description: 'Criar os scripts test, test:watch e test:coverage.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever o Primeiro Teste "Smoke"',
          description:
            'Criar um teste simples para o componente App.tsx que verifica se ele renderiza sem erros.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o ESLint para Testes',
          description:
            'Instalar e configurar eslint-plugin-vitest e eslint-plugin-testing-library.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Instalar o user-event',
          description:
            'Executar npm install -D @testing-library/user-event para simular interações do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Caminhos Absolutos nos Testes',
          description:
            'Garantir que os paths do tsconfig.json sejam reconhecidos pelo Vitest.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Instalar o MSW (Mock Service Worker)',
          description: 'Executar npm install -D msw para mockar a API.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar os "Handlers" do MSW',
          description:
            'Criar o diretório src/mocks/handlers.ts para definir os mocks de endpoints.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o "Server" do MSW para Testes',
          description:
            'Criar src/mocks/server.ts e integrá-lo ao setup de testes para interceptar chamadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar a Geração de Relatórios de Cobertura',
          description:
            'Configurar o coverage no vitest.config.ts para usar o provider v8.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar o Diretório de Cobertura ao .gitignore',
          description: 'Ignorar a pasta /coverage do controle de versão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Instalar jest-axe para Testes de Acessibilidade',
          description: 'Executar npm install -D jest-axe.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um "Matcher" Customizado para jest-axe',
          description:
            'Estender os matchers do Vitest com toHaveNoViolations no arquivo de setup.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Instalar e Configurar o Cypress',
          description:
            'Executar o comando de instalação do Cypress para testes End-to-End (E2E).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o cypress.config.ts',
          description:
            'Definir a baseUrl e outras configurações para o ambiente de E2E.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Scripts de Teste E2E no package.json',
          description: 'Criar os scripts cy:open e cy:run.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Integrar a Testing Library no Cypress',
          description:
            'Instalar @testing-library/cypress para usar as mesmas queries da RTL nos testes E2E.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Linter para Cypress',
          description:
            'Adicionar o plugin eslint-plugin-cypress para seguir as boas práticas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar o Primeiro Teste E2E "Smoke"',
          description:
            'Criar um teste que visita a página inicial e verifica se o título está correto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o tsconfig.json do Cypress',
          description:
            'Garantir que o Cypress tenha seu próprio escopo de tipos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Pastas do Cypress ao .gitignore',
          description:
            'Ignorar vídeos, screenshots e relatórios gerados pelo Cypress.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função Pura de Formatação (ex: formatDate)',
          description:
            'Criar testes para diferentes entradas, incluindo casos de borda e valores nulos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função de Validação (ex: isValidEmail)',
          description: 'Escrever testes para e-mails válidos e inválidos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useToggle',
          description:
            'Verificar o estado inicial e se a função de toggle inverte o valor booleano.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useLocalStorage',
          description:
            'Mockar o localStorage e testar se o hook lê, escreve e remove valores corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useDebounce',
          description:
            'Usar vi.useFakeTimers() para controlar o tempo e verificar se a função é chamada após o delay.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função que Usa Date',
          description:
            'Usar vi.setSystemTime() para garantir que os testes sejam determinísticos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar Funções de Cálculo (ex: calculateTotalPrice)',
          description:
            'Verificar a precisão dos cálculos, incluindo testes com zero e números negativos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Geração de URLs',
          description: 'Testar uma função que constrói URLs com query params.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Tratamento de Erros em uma Função',
          description:
            'Verificar se a função lança o erro esperado (expect(...).toThrow()).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Parser de Dados',
          description:
            'Testar uma função que transforma os dados da API para o formato da UI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Mockar Dependências de uma Função',
          description:
            'Usar vi.mock() para isolar a unidade sob teste de suas dependências.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useMediaQuery',
          description:
            'Mockar window.matchMedia para simular diferentes tamanhos de tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Lógica de Pluralização',
          description:
            'Criar testes para uma função que retorna a forma singular ou plural de uma palavra.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Seletor de Estado (ex: Redux)',
          description:
            'Testar uma função de seletor com diferentes formatos do estado global.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Reducer',
          description:
            'Testar cada tipo de ação e verificar se o estado é atualizado corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Geração de Classes CSS Condicionais',
          description:
            'Testar a função utilitária (clsx) com diferentes objetos de classes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useCopyToClipboard',
          description:
            'Mockar a API de Clipboard e verificar se a função de cópia é chamada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função que Ordena Arrays',
          description: 'Testar a ordenação de números, strings e objetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função que Filtra Arrays',
          description: 'Criar múltiplos cenários de filtragem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook que Rastreia o Status Online',
          description:
            'Disparar eventos online e offline na window e verificar o estado do hook.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de um Componente de Botão',
          description: 'Verificar se o botão renderiza com o texto correto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Estado Desabilitado de um Botão',
          description:
            'Passar a prop disabled e verificar se o atributo disabled está presente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Evento onClick de um Botão',
          description:
            'Usar vi.fn() para criar uma função mock, simular um clique e verificar se ela foi chamada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Input',
          description:
            'Simular a digitação do usuário (userEvent.type) e verificar se o valor do input é atualizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente com Renderização Condicional',
          description:
            'Alternar uma prop e verificar se o elemento correto aparece ou desaparece da tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Recebe Props',
          description:
            'Passar diferentes props e verificar se a saída renderizada corresponde.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Alerta',
          description:
            'Verificar se o alerta renderiza com a mensagem e a variante de cor correta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Acessibilidade de um Modal',
          description:
            'Usar jest-axe para verificar se o modal aberto não tem violações de acessibilidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fechamento de um Modal',
          description:
            'Simular um clique no botão de fechar ou o pressionar da tecla "Escape".',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Tabela',
          description:
            'Verificar se os cabeçalhos e as linhas de dados são renderizados corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Skeleton Loader',
          description:
            'Verificar se o skeleton é exibido quando a prop isLoading é verdadeira.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fallback de um Componente de Avatar',
          description:
            'Simular um erro no carregamento da imagem e verificar se as iniciais do usuário são exibidas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Abas (Tabs)',
          description:
            'Simular cliques nas abas e verificar se o conteúdo correto é exibido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Submissão de um Formulário',
          description:
            'Preencher os campos, simular um clique no botão de submit e verificar se a função de callback foi chamada com os dados corretos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Exibição de Erros de Validação',
          description:
            'Tentar submeter um formulário inválido e verificar se as mensagens de erro aparecem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Select',
          description: 'Simular a abertura do select e a escolha de uma opção.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Usa Contexto',
          description:
            'Criar um wrapper no teste que provê o contexto necessário para o componente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de Listas',
          description:
            'Passar um array de itens e verificar se o número correto de elementos é renderizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Estado Vazio de uma Lista',
          description:
            'Passar um array vazio e verificar se a mensagem de "nenhum item encontrado" é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Interação com um Checkbox',
          description:
            'Simular um clique e verificar se o estado checked é atualizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Link',
          description: 'Verificar se o href do link está correto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que usa um Hook Customizado',
          description:
            'Mockar o hook para controlar seu retorno e testar a UI do componente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Tooltip',
          description:
            'Simular um hover no elemento gatilho e verificar se o tooltip aparece.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Paginação',
          description:
            'Simular cliques nos botões de "próximo" e "anterior" e verificar se o callback é chamado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Acessibilidade de um Formulário',
          description:
            'Verificar se todos os inputs têm labels associadas corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Accordion',
          description:
            'Simular cliques nos cabeçalhos e verificar se o conteúdo é exibido ou ocultado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Formata Datas',
          description:
            'Verificar se a data é exibida no formato esperado para o usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de um Ícone SVG',
          description:
            'Verificar se o SVG está presente no DOM com os atributos corretos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Breadcrumb',
          description: 'Verificar se a hierarquia de navegação está correta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Foco do Teclado em um Componente',
          description:
            'Usar userEvent.tab() para simular a navegação por teclado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Upload de Arquivo',
          description:
            'Simular a seleção de um arquivo e verificar se o estado do componente é atualizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Barra de Progresso',
          description:
            'Verificar se a barra reflete corretamente o valor passado via prop.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que usa useEffect',
          description:
            'Verificar se os efeitos colaterais esperados ocorrem após a renderização.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o "Unmount" de um Componente',
          description:
            'Verificar se as funções de limpeza (cleanup) são chamadas quando o componente é desmontado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Renderiza Markdown',
          description:
            'Verificar se o HTML resultante é renderizado corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o "Lazy Loading" de um Componente',
          description:
            'Usar React.lazy e Suspense e verificar se o fallback de loading é exibido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Switch (Toggle)',
          description:
            'Simular um clique e verificar se o estado "ligado/desligado" é alternado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de "Toast"',
          description:
            'Disparar um evento que exibe o "toast" e verificar se ele aparece com a mensagem correta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Edição "In-place"',
          description:
            'Simular um clique no texto, verificar se ele se torna um input e testar a edição.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que usa a API de Internacionalização (i18n)',
          description:
            'Mockar o provider de i18n e verificar se o texto é traduzido corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Login Completo',
          description:
            'Renderizar a página de login, preencher o formulário, mockar a resposta da API e verificar o redirecionamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Tratamento de Erro no Login',
          description:
            'Mockar uma resposta de erro da API e verificar se a mensagem de "credenciais inválidas" é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Navegação entre Páginas',
          description:
            'Renderizar a aplicação, simular um clique em um link e verificar se a nova página é renderizada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Página de Lista que Busca Dados',
          description:
            'Renderizar a página, mockar a API e verificar se os itens são exibidos na tela após o carregamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Filtragem em uma Página de Lista',
          description:
            'Interagir com os filtros, mockar a nova chamada de API e verificar se a lista é atualizada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Exclusão de um Item em uma Lista',
          description:
            'Clicar no botão de excluir, confirmar no modal, mockar a API e verificar se o item some da lista.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Criação de um Novo Item',
          description:
            'Navegar para a página de criação, preencher o formulário, mockar a API e verificar o redirecionamento para a lista.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Atualização de um Item',
          description:
            'Navegar para a página de edição, modificar os dados, mockar a API e verificar se a atualização é refletida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de "Esqueci minha Senha"',
          description:
            'Preencher o e-mail, mockar a API e verificar se a mensagem de sucesso é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Interação entre o Estado Global e a UI',
          description:
            'Disparar uma ação que muda o estado global (ex: trocar tema) e verificar se a UI reflete a mudança.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar Rotas Protegidas',
          description:
            'Tentar acessar uma rota privada sem autenticação e verificar se o usuário é redirecionado para o login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Onboarding de um Novo Usuário',
          description:
            'Simular o primeiro login e verificar se o tour guiado ou o modal de boas-vindas é exibido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração da Busca Global',
          description:
            'Digitar na busca, mockar a API e verificar se os resultados são exibidos em um dropdown.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Página de Configurações',
          description:
            'Alterar uma configuração, mockar a API e verificar se a mensagem de "salvo com sucesso" aparece.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração do "Toast" com Ações da API',
          description:
            'Simular uma mutação bem-sucedida e verificar se a notificação de sucesso é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Invalidação de Cache do React Query',
          description:
            'Realizar uma mutação e verificar se a query correspondente é refetchada automaticamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Paginação de uma Lista',
          description:
            'Clicar em "próxima página", mockar a API e verificar se os novos itens são renderizados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração do ErrorBoundary',
          description:
            'Criar um componente que lança um erro e verificar se a UI de fallback é renderizada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Logout',
          description:
            'Clicar no botão de logout e verificar se o usuário é redirecionado para a página de login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Página com Múltiplas Chamadas de API',
          description:
            'Mockar todas as APIs e verificar se a página renderiza corretamente após todas as chamadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever um Comando Customizado de Login no Cypress',
          description:
            'Criar um comando cy.login() para reutilizar a lógica de autenticação nos testes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Registro de um Novo Usuário (E2E)',
          description:
            'Visitar a página de registro, preencher todos os campos, submeter e verificar a página de sucesso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Login e Logout (E2E)',
          description:
            'Fazer login, verificar se está na área logada e, em seguida, fazer logout e verificar se voltou para a página de login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o CRUD Completo de uma Feature Crítica (E2E)',
          description:
            'Criar, ler, atualizar e deletar um item, verificando a UI em cada passo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Responsividade da Aplicação',
          description:
            'Usar cy.viewport() para testar a aplicação em diferentes tamanhos de tela (mobile, tablet, desktop).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Trabalho de um Usuário "Power User"',
          description:
            'Simular uma jornada complexa que envolve múltiplas features da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Interceptar e Mockar Respostas de API no Cypress',
          description:
            'Usar cy.intercept() para controlar as respostas da API e testar cenários de erro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Navegação Completa pelo Menu Principal',
          description:
            'Clicar em cada item do menu e verificar se a página correta é carregada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Validação de um Formulário Complexo (E2E)',
          description:
            'Tentar submeter o formulário com diferentes tipos de erros e verificar todas as mensagens.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Convidar um Novo Membro para a Equipe',
          description:
            'Preencher o formulário de convite e verificar se o novo membro aparece na lista.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Funcionalidade de Upload de Arquivo (E2E)',
          description:
            'Selecionar um arquivo e verificar se ele aparece na UI após o upload.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Acessibilidade de Páginas Críticas (E2E)',
          description:
            'Integrar cypress-axe e rodar uma verificação de acessibilidade nas páginas de login e dashboard.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Compra ou Assinatura (se aplicável)',
          description:
            'Simular a escolha de um plano, o preenchimento de dados de pagamento e a confirmação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração com Serviços de Terceiros (mockado)',
          description:
            'Interceptar as chamadas para APIs externas e simular respostas de sucesso e erro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Funcionalidade de Busca (E2E)',
          description:
            'Digitar um termo de busca, submeter e verificar se os resultados na página correspondem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Gravar Vídeos de Testes que Falham',
          description:
            'Configurar o Cypress para gravar vídeos, facilitando a depuração de falhas no CI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Persistência de Estado entre Sessões',
          description:
            'Alterar uma configuração, recarregar a página e verificar se a configuração foi mantida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Sincronização de Dados em Tempo Real (mockado)',
          description:
            'Mockar eventos de WebSocket e verificar se a UI é atualizada sem interação do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Aplicação em Diferentes Navegadores',
          description:
            'Configurar o Cypress ou Playwright para rodar os testes no Chrome, Firefox e WebKit.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar "Data Seeds" para Testes E2E',
          description:
            'Usar um comando (cy.task) para popular o banco de dados de teste com um estado conhecido antes do teste.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Política de Privacidade e Termos de Serviço',
          description:
            'Verificar se os links estão presentes no rodapé e se as páginas são carregadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Redirecionamento de Rotas Antigas',
          description:
            'Acessar uma URL legada e verificar se o redirecionamento para a nova rota funciona.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Comportamento de Links Externos',
          description:
            'Verificar se links para outros sites têm os atributos target="_blank" e rel="noopener noreferrer".',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Paginação Completa de uma Lista (E2E)',
          description:
            'Navegar por todas as páginas de uma lista para garantir que não há erros.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Testes "Smoke" para Produção',
          description:
            'Ter um conjunto mínimo de testes E2E para rodar contra o ambiente de produção após um deploy.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Testes de Regressão Visual',
          description:
            'Instalar Percy, Chromatic ou usar o Playwright para comparar screenshots e aprovar mudanças visuais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Testes de Snapshot para Componentes Visuais',
          description:
            'Usar snapshots do Vitest para componentes que raramente mudam, como ícones ou ilustrações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Desempenho de Carregamento da Página com Lighthouse CI',
          description:
            'Integrar o Lighthouse ao pipeline de CI para evitar regressões nas métricas de Web Vitals.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o "Dark Mode"',
          description:
            'Criar testes (visuais e E2E) que ativam o modo escuro e verificam a UI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Internacionalização (i18n)',
          description:
            'Criar testes E2E que trocam o idioma e verificam se o texto da página é traduzido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Comportamento Offline do PWA',
          description:
            'Desativar a rede no Cypress/Playwright e verificar se a aplicação continua funcionando.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Instalação do PWA',
          description:
            'Criar um teste que verifica se o manifest.json está correto e se o evento de instalação é disparado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Sincronização em Background do PWA',
          description:
            'Mockar a API de Background Sync e testar a fila de ações offline.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Anotações de "Test ID"',
          description:
            'Adicionar atributos data-testid nos elementos para criar seletores de teste mais resilientes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar uma Matriz de Testes no CI',
          description:
            'Configurar o workfMedium para rodar os testes em diferentes versões do Node.js e sistemas operacionais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Experiência com Conexões Lentas',
          description:
            'Usar o "throttling" de rede do Cypress/Playwright para simular uma conexão 3G.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Geolocalização (mockada)',
          description:
            'Mockar a API de geolocalização do navegador e verificar se a aplicação usa as coordenadas corretas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar as Notificações Push (mockadas)',
          description:
            'Mockar a API de notificações e verificar se a UI de permissão e as notificações são tratadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Aplicação com "Feature Flags"',
          description:
            'Criar testes que rodam com diferentes combinações de feature flags ativadas e desativadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Executar Testes em Paralelo no CI',
          description:
            'Configurar o CI para dividir os testes E2E em múltiplas máquinas e rodá-los em paralelo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de "Copy to Clipboard"',
          description:
            'Clicar em um botão de copiar e verificar o conteúdo da área de transferência.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Comentários Explicativos em Testes Complexos',
          description:
            'Documentar o "porquê" de testes que têm uma lógica de setup ou asserção complexa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Refatorar Testes para Usar "Page Object Model"',
          description:
            'Criar classes ou objetos que abstraem as páginas da aplicação para tornar os testes E2E mais legíveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Envio de Eventos de Analytics',
          description:
            'Interceptar as chamadas para a ferramenta de analytics e verificar se os eventos corretos são enviados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Revisar e Otimizar a Velocidade dos Testes',
          description:
            'Analisar o tempo de execução dos testes e otimizar os mais lentos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar um "Retry" para Testes "Flaky"',
          description:
            'Configurar o Cypress/Playwright para rodar novamente testes que falham de forma intermitente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a API de Drag and Drop',
          description:
            'Escrever testes que simulam o arrastar e soltar de elementos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Hot Module Replacement (HMR)',
          description:
            'Criar testes específicos para o ambiente de desenvolvimento que verificam se o HMR está funcionando.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de Conteúdo de um CMS',
          description:
            'Mockar a resposta do CMS e garantir que diferentes tipos de blocos de conteúdo são renderizados corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Dashboard de Qualidade do Código',
          description:
            'Integrar ferramentas (SonarQube, Codecov) para ter uma visão unificada da saúde do projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useDebounce',
          description:
            'Usar vi.useFakeTimers() para controlar o tempo e verificar se a função é chamada após o delay.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função que Usa Date',
          description:
            'Usar vi.setSystemTime() para garantir que os testes sejam determinísticos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar Funções de Cálculo (ex: calculateTotalPrice)',
          description:
            'Verificar a precisão dos cálculos, incluindo testes com zero e números negativos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Geração de URLs',
          description: 'Testar uma função que constrói URLs com query params.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Tratamento de Erros em uma Função',
          description:
            'Verificar se a função lança o erro esperado (expect(...).toThrow()).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Parser de Dados',
          description:
            'Testar uma função que transforma os dados da API para o formato da UI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Mockar Dependências de uma Função',
          description:
            'Usar vi.mock() para isolar a unidade sob teste de suas dependências.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useMediaQuery',
          description:
            'Mockar window.matchMedia para simular diferentes tamanhos de tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Lógica de Pluralização',
          description:
            'Criar testes para uma função que retorna a forma singular ou plural de uma palavra.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Seletor de Estado (ex: Redux)',
          description:
            'Testar uma função de seletor com diferentes formatos do estado global.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Reducer',
          description:
            'Testar cada tipo de ação e verificar se o estado é atualizado corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Geração de Classes CSS Condicionais',
          description:
            'Testar a função utilitária (clsx) com diferentes objetos de classes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook useCopyToClipboard',
          description:
            'Mockar a API de Clipboard e verificar se a função de cópia é chamada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função que Ordena Arrays',
          description: 'Testar a ordenação de números, strings e objetos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Função que Filtra Arrays',
          description: 'Criar múltiplos cenários de filtragem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Hook que Rastreia o Status Online',
          description:
            'Disparar eventos online e offline na window e verificar o estado do hook.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de um Componente de Botão',
          description: 'Verificar se o botão renderiza com o texto correto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Estado Desabilitado de um Botão',
          description:
            'Passar a prop disabled e verificar se o atributo disabled está presente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Evento onClick de um Botão',
          description:
            'Usar vi.fn() para criar uma função mock, simular um clique e verificar se ela foi chamada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Input',
          description:
            'Simular a digitação do usuário (userEvent.type) e verificar se o valor do input é atualizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente com Renderização Condicional',
          description:
            'Alternar uma prop e verificar se o elemento correto aparece ou desaparece da tela.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Recebe Props',
          description:
            'Passar diferentes props e verificar se a saída renderizada corresponde.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Alerta',
          description:
            'Verificar se o alerta renderiza com a mensagem e a variante de cor correta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Acessibilidade de um Modal',
          description:
            'Usar jest-axe para verificar se o modal aberto não tem violações de acessibilidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fechamento de um Modal',
          description:
            'Simular um clique no botão de fechar ou o pressionar da tecla "Escape".',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Tabela',
          description:
            'Verificar se os cabeçalhos e as linhas de dados são renderizados corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Skeleton Loader',
          description:
            'Verificar se o skeleton é exibido quando a prop isLoading é verdadeira.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fallback de um Componente de Avatar',
          description:
            'Simular um erro no carregamento da imagem e verificar se as iniciais do usuário são exibidas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Abas (Tabs)',
          description:
            'Simular cliques nas abas e verificar se o conteúdo correto é exibido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Submissão de um Formulário',
          description:
            'Preencher os campos, simular um clique no botão de submit e verificar se a função de callback foi chamada com os dados corretos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Exibição de Erros de Validação',
          description:
            'Tentar submeter um formulário inválido e verificar se as mensagens de erro aparecem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Select',
          description: 'Simular a abertura do select e a escolha de uma opção.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Usa Contexto',
          description:
            'Criar um wrapper no teste que provê o contexto necessário para o componente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de Listas',
          description:
            'Passar um array de itens e verificar se o número correto de elementos é renderizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Estado Vazio de uma Lista',
          description:
            'Passar um array vazio e verificar se a mensagem de "nenhum item encontrado" é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Interação com um Checkbox',
          description:
            'Simular um clique e verificar se o estado checked é atualizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Link',
          description: 'Verificar se o href do link está correto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que usa um Hook Customizado',
          description:
            'Mockar o hook para controlar seu retorno e testar a UI do componente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Tooltip',
          description:
            'Simular um hover no elemento gatilho e verificar se o tooltip aparece.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Paginação',
          description:
            'Simular cliques nos botões de "próximo" e "anterior" e verificar se o callback é chamado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Acessibilidade de um Formulário',
          description:
            'Verificar se todos os inputs têm labels associadas corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Accordion',
          description:
            'Simular cliques nos cabeçalhos e verificar se o conteúdo é exibido ou ocultado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Formata Datas',
          description:
            'Verificar se a data é exibida no formato esperado para o usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de um Ícone SVG',
          description:
            'Verificar se o SVG está presente no DOM com os atributos corretos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Breadcrumb',
          description: 'Verificar se a hierarquia de navegação está correta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Foco do Teclado em um Componente',
          description:
            'Usar userEvent.tab() para simular a navegação por teclado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Upload de Arquivo',
          description:
            'Simular a seleção de um arquivo e verificar se o estado do componente é atualizado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Barra de Progresso',
          description:
            'Verificar se a barra reflete corretamente o valor passado via prop.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que usa useEffect',
          description:
            'Verificar se os efeitos colaterais esperados ocorrem após a renderização.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o "Unmount" de um Componente',
          description:
            'Verificar se as funções de limpeza (cleanup) são chamadas quando o componente é desmontado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que Renderiza Markdown',
          description:
            'Verificar se o HTML resultante é renderizado corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o "Lazy Loading" de um Componente',
          description:
            'Usar React.lazy e Suspense e verificar se o fallback de loading é exibido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Switch (Toggle)',
          description:
            'Simular um clique e verificar se o estado "ligado/desligado" é alternado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de "Toast"',
          description:
            'Disparar um evento que exibe o "toast" e verificar se ele aparece com a mensagem correta.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente de Edição "In-place"',
          description:
            'Simular um clique no texto, verificar se ele se torna um input e testar a edição.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar um Componente que usa a API de Internacionalização (i18n)',
          description:
            'Mockar o provider de i18n e verificar se o texto é traduzido corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Login Completo',
          description:
            'Renderizar a página de login, preencher o formulário, mockar a resposta da API e verificar o redirecionamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Tratamento de Erro no Login',
          description:
            'Mockar uma resposta de erro da API e verificar se a mensagem de "credenciais inválidas" é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Navegação entre Páginas',
          description:
            'Renderizar a aplicação, simular um clique em um link e verificar se a nova página é renderizada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Página de Lista que Busca Dados',
          description:
            'Renderizar a página, mockar a API e verificar se os itens são exibidos na tela após o carregamento.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Filtragem em uma Página de Lista',
          description:
            'Interagir com os filtros, mockar a nova chamada de API e verificar se a lista é atualizada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Exclusão de um Item em uma Lista',
          description:
            'Clicar no botão de excluir, confirmar no modal, mockar a API e verificar se o item some da lista.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Criação de um Novo Item',
          description:
            'Navegar para a página de criação, preencher o formulário, mockar a API e verificar o redirecionamento para a lista.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Atualização de um Item',
          description:
            'Navegar para a página de edição, modificar os dados, mockar a API e verificar se a atualização é refletida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de "Esqueci minha Senha"',
          description:
            'Preencher o e-mail, mockar a API e verificar se a mensagem de sucesso é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Interação entre o Estado Global e a UI',
          description:
            'Disparar uma ação que muda o estado global (ex: trocar tema) e verificar se a UI reflete a mudança.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar Rotas Protegidas',
          description:
            'Tentar acessar uma rota privada sem autenticação e verificar se o usuário é redirecionado para o login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Onboarding de um Novo Usuário',
          description:
            'Simular o primeiro login e verificar se o tour guiado ou o modal de boas-vindas é exibido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração da Busca Global',
          description:
            'Digitar na busca, mockar a API e verificar se os resultados são exibidos em um dropdown.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Página de Configurações',
          description:
            'Alterar uma configuração, mockar a API e verificar se a mensagem de "salvo com sucesso" aparece.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração do "Toast" com Ações da API',
          description:
            'Simular uma mutação bem-sucedida e verificar se a notificação de sucesso é exibida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Invalidação de Cache do React Query',
          description:
            'Realizar uma mutação e verificar se a query correspondente é refetchada automaticamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Paginação de uma Lista',
          description:
            'Clicar em "próxima página", mockar a API e verificar se os novos itens são renderizados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração do ErrorBoundary',
          description:
            'Criar um componente que lança um erro e verificar se a UI de fallback é renderizada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Logout',
          description:
            'Clicar no botão de logout e verificar se o usuário é redirecionado para a página de login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar uma Página com Múltiplas Chamadas de API',
          description:
            'Mockar todas as APIs e verificar se a página renderiza corretamente após todas as chamadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever um Comando Customizado de Login no Cypress',
          description:
            'Criar um comando cy.login() para reutilizar a lógica de autenticação nos testes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Registro de um Novo Usuário (E2E)',
          description:
            'Visitar a página de registro, preencher todos os campos, submeter e verificar a página de sucesso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Login e Logout (E2E)',
          description:
            'Fazer login, verificar se está na área logada e, em seguida, fazer logout e verificar se voltou para a página de login.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o CRUD Completo de uma Feature Crítica (E2E)',
          description:
            'Criar, ler, atualizar e deletar um item, verificando a UI em cada passo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Responsividade da Aplicação',
          description:
            'Usar cy.viewport() para testar a aplicação em diferentes tamanhos de tela (mobile, tablet, desktop).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Trabalho de um Usuário "Power User"',
          description:
            'Simular uma jornada complexa que envolve múltiplas features da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Interceptar e Mockar Respostas de API no Cypress',
          description:
            'Usar cy.intercept() para controlar as respostas da API e testar cenários de erro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Navegação Completa pelo Menu Principal',
          description:
            'Clicar em cada item do menu e verificar se a página correta é carregada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Validação de um Formulário Complexo (E2E)',
          description:
            'Tentar submeter o formulário com diferentes tipos de erros e verificar todas as mensagens.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Convidar um Novo Membro para a Equipe',
          description:
            'Preencher o formulário de convite e verificar se o novo membro aparece na lista.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Funcionalidade de Upload de Arquivo (E2E)',
          description:
            'Selecionar um arquivo e verificar se ele aparece na UI após o upload.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Acessibilidade de Páginas Críticas (E2E)',
          description:
            'Integrar cypress-axe e rodar uma verificação de acessibilidade nas páginas de login e dashboard.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de Compra ou Assinatura (se aplicável)',
          description:
            'Simular a escolha de um plano, o preenchimento de dados de pagamento e a confirmação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Integração com Serviços de Terceiros (mockado)',
          description:
            'Interceptar as chamadas para APIs externas e simular respostas de sucesso e erro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Funcionalidade de Busca (E2E)',
          description:
            'Digitar um termo de busca, submeter e verificar se os resultados na página correspondem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Gravar Vídeos de Testes que Falham',
          description:
            'Configurar o Cypress para gravar vídeos, facilitando a depuração de falhas no CI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Persistência de Estado entre Sessões',
          description:
            'Alterar uma configuração, recarregar a página e verificar se a configuração foi mantida.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Sincronização de Dados em Tempo Real (mockado)',
          description:
            'Mockar eventos de WebSocket e verificar se a UI é atualizada sem interação do usuário.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Aplicação em Diferentes Navegadores',
          description:
            'Configurar o Cypress ou Playwright para rodar os testes no Chrome, Firefox e WebKit.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar "Data Seeds" para Testes E2E',
          description:
            'Usar um comando (cy.task) para popular o banco de dados de teste com um estado conhecido antes do teste.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Política de Privacidade e Termos de Serviço',
          description:
            'Verificar se os links estão presentes no rodapé e se as páginas são carregadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Redirecionamento de Rotas Antigas',
          description:
            'Acessar uma URL legada e verificar se o redirecionamento para a nova rota funciona.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Comportamento de Links Externos',
          description:
            'Verificar se links para outros sites têm os atributos target="_blank" e rel="noopener noreferrer".',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Paginação Completa de uma Lista (E2E)',
          description:
            'Navegar por todas as páginas de uma lista para garantir que não há erros.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Testes "Smoke" para Produção',
          description:
            'Ter um conjunto mínimo de testes E2E para rodar contra o ambiente de produção após um deploy.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Testes de Regressão Visual',
          description:
            'Instalar Percy, Chromatic ou usar o Playwright para comparar screenshots e aprovar mudanças visuais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Testes de Snapshot para Componentes Visuais',
          description:
            'Usar snapshots do Vitest para componentes que raramente mudam, como ícones ou ilustrações.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Desempenho de Carregamento da Página com Lighthouse CI',
          description:
            'Integrar o Lighthouse ao pipeline de CI para evitar regressões nas métricas de Web Vitals.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o "Dark Mode"',
          description:
            'Criar testes (visuais e E2E) que ativam o modo escuro e verificam a UI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Internacionalização (i18n)',
          description:
            'Criar testes E2E que trocam o idioma e verificam se o texto da página é traduzido.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Comportamento Offline do PWA',
          description:
            'Desativar a rede no Cypress/Playwright e verificar se a aplicação continua funcionando.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Instalação do PWA',
          description:
            'Criar um teste que verifica se o manifest.json está correto e se o evento de instalação é disparado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Sincronização em Background do PWA',
          description:
            'Mockar a API de Background Sync e testar a fila de ações offline.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Anotações de "Test ID"',
          description:
            'Adicionar atributos data-testid nos elementos para criar seletores de teste mais resilientes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar uma Matriz de Testes no CI',
          description:
            'Configurar o workfMedium para rodar os testes em diferentes versões do Node.js e sistemas operacionais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Experiência com Conexões Lentas',
          description:
            'Usar o "throttling" de rede do Cypress/Playwright para simular uma conexão 3G.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Geolocalização (mockada)',
          description:
            'Mockar a API de geolocalização do navegador e verificar se a aplicação usa as coordenadas corretas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar as Notificações Push (mockadas)',
          description:
            'Mockar a API de notificações e verificar se a UI de permissão e as notificações são tratadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Aplicação com "Feature Flags"',
          description:
            'Criar testes que rodam com diferentes combinações de feature flags ativadas e desativadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Executar Testes em Paralelo no CI',
          description:
            'Configurar o CI para dividir os testes E2E em múltiplas máquinas e rodá-los em paralelo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Fluxo de "Copy to Clipboard"',
          description:
            'Clicar em um botão de copiar e verificar o conteúdo da área de transferência.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Comentários Explicativos em Testes Complexos',
          description:
            'Documentar o "porquê" de testes que têm uma lógica de setup ou asserção complexa.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Refatorar Testes para Usar "Page Object Model"',
          description:
            'Criar classes ou objetos que abstraem as páginas da aplicação para tornar os testes E2E mais legíveis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Envio de Eventos de Analytics',
          description:
            'Interceptar as chamadas para a ferramenta de analytics e verificar se os eventos corretos são enviados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Revisar e Otimizar a Velocidade dos Testes',
          description:
            'Analisar o tempo de execução dos testes e otimizar os mais lentos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar um "Retry" para Testes "Flaky"',
          description:
            'Configurar o Cypress/Playwright para rodar novamente testes que falham de forma intermitente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a API de Drag and Drop',
          description:
            'Escrever testes que simulam o arrastar e soltar de elementos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Hot Module Replacement (HMR)',
          description:
            'Criar testes específicos para o ambiente de desenvolvimento que verificam se o HMR está funcionando.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Renderização de Conteúdo de um CMS',
          description:
            'Mockar a resposta do CMS e garantir que diferentes tipos de blocos de conteúdo são renderizados corretamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Dashboard de Qualidade do Código',
          description:
            'Integrar ferramentas (SonarQube, Codecov) para ter uma visão unificada da saúde do projeto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escolher o Provedor de Nuvem Principal',
          description:
            'Avaliar e decidir entre AWS, Google Cloud (GCP) e Azure com base em custo, serviços e familiaridade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escolher a Plataforma de Hospedagem do Frontend',
          description:
            'Avaliar e decidir entre Vercel/Netlify (simplicidade) ou S3/CloudFront (controle).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Registrar um Domínio',
          description:
            'Comprar o domínio principal da aplicação (ex: meuprojeto.com) em um registrador.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Definir a Arquitetura da Aplicação',
          description:
            'Decidir a arquitetura inicial (ex: monólito, microsserviços, serverless) para guiar as escolhas de infra.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Mapear os Ambientes de Trabalho',
          description:
            'Definir os ambientes necessários (ex: Desenvolvimento, Staging, Produção).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escolher a Ferramenta de Infraestrutura como Código (IaC)',
          description:
            'Decidir entre Terraform (multi-cloud) e CloudFormation (AWS) / Deployment Manager (GCP).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar uma Conta no Provedor de Nuvem',
          description: 'Realizar o cadastro inicial na AWS/GCP/Azure.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Faturamento e Alertas de Custo',
          description:
            'Adicionar um método de pagamento e criar alertas para ser notificado se os custos excederem um limite.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Ativar a Autenticação Multi-Fator (MFA) na Conta Raiz',
          description:
            'Proteger a conta principal do provedor de nuvem com MFA.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escolher as Regiões de Hospedagem',
          description:
            'Decidir em qual(is) região(ões) geográfica(s) a infraestrutura será implantada.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Repositório Git para a Infraestrutura',
          description:
            'Iniciar um novo repositório dedicado ao código de Infraestrutura como Código (IaC).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Planejar a Estratégia de Backup',
          description:
            'Definir a frequência, retenção e o método de backup para o banco de dados e arquivos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Definir a Política de Gerenciamento de Segredos',
          description:
            'Escolher uma ferramenta para armazenar senhas e chaves de API (ex: AWS Secrets Manager, Vault).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Esboçar o Diagrama de Rede Inicial',
          description:
            'Desenhar a topologia da VPC, sub-redes e como os serviços se comunicarão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escolher a Estratégia de CI/CD',
          description:
            'Decidir a ferramenta de automação (ex: GitHub Actions, GitLab CI, Jenkins).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Definir o "Recovery Point Objective" (RPO) e "Recovery Time Objective" (RTO)',
          description:
            'Estabelecer as metas de perda máxima de dados e tempo máximo de indisponibilidade em caso de desastre.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar uma Conta de E-mail para o Domínio',
          description:
            'Configurar serviços de e-mail (ex: Google Workspace, Amazon SES) para contato@meuprojeto.com.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Planejar o Monitoramento da Aplicação',
          description:
            'Escolher as ferramentas para monitoramento, logging e alertas (ex: CloudWatch, Datadog, Sentry).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Definir uma Estratégia de Versionamento para a Aplicação',
          description:
            'Adotar o Versionamento Semântico (SemVer) para os deploys do frontend e backend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Levantar os Requisitos de Conformidade',
          description:
            'Verificar se a aplicação precisa seguir alguma norma específica (LGPD, HIPAA, etc.).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar uma Organização no Provedor de Nuvem',
          description:
            'Usar AWS Organizations ou similar para gerenciar múltiplas contas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Contas Separadas por Ambiente',
          description:
            'Isolar os ambientes de Produção e Desenvolvimento em contas separadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Usuários IAM para Desenvolvedores',
          description:
            'Criar usuários individuais no serviço de Identity and Access Management (IAM), evitando usar a conta raiz.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Grupos e Papéis (Roles) no IAM',
          description:
            'Agrupar usuários em grupos (ex: "Desenvolvedores") e definir permissões através de papéis.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Aplicar uma Política de Senha Forte no IAM',
          description:
            'Forçar senhas complexas e rotação periódica para os usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Forçar o Uso de MFA para Todos os Usuários',
          description:
            'Criar uma política no IAM que exige que todos os usuários configurem a autenticação multi-fator.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Papéis (Roles) para Serviços',
          description:
            'Configurar papéis para que os serviços da nuvem (ex: EC2, Lambda) possam interagir entre si sem chaves de acesso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Acesso Programático para CI/CD',
          description:
            'Criar um usuário ou papel IAM específico para o sistema de CI/CD com permissões mínimas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Faturamento Consolidado',
          description:
            'Usar a conta da Organização para centralizar o faturamento de todas as outras contas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar o CloudTrail ou Equivalente',
          description:
            'Ativar o log de todas as chamadas de API feitas na sua conta para auditoria de segurança.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Chaves SSH para Acesso a Instâncias',
          description:
            'Gerar um par de chaves SSH para acessar máquinas virtuais de forma segura.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o AWS CLI ou gcloud CLI',
          description:
            'Instalar e configurar a interface de linha de comando do provedor de nuvem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Definir Políticas de Controle de Serviço (SCPs)',
          description:
            'Na Organização, criar restrições de alto nível (ex: proibir o uso de certas regiões).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Orçamento Detalhado por Serviço',
          description:
            'Configurar orçamentos no AWS Budgets ou similar para monitorar custos por recurso.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Contatos de Segurança Alternativos',
          description:
            'Adicionar contatos de emergência na sua conta de nuvem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Instalar o Terraform',
          description:
            'Baixar e instalar a CLI do Terraform na máquina local e no ambiente de CI.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Backend Remoto do Terraform',
          description:
            'Criar um bucket S3/GCS para armazenar o arquivo de estado (.tfstate) de forma segura.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar o Bloqueio de Estado (State Locking)',
          description:
            'Usar DynamoDB (AWS) ou similar para evitar que duas pessoas modifiquem a infra ao mesmo tempo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever o Código IaC para a Rede (VPC)',
          description:
            'Criar a Virtual Private Cloud (VPC), sub-redes públicas e privadas, e tabelas de rotas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever o Código IaC para o Gateway de Internet e NAT',
          description:
            'Provisionar um Internet Gateway para as sub-redes públicas e um NAT Gateway para as privadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever o Código IaC para Grupos de Segurança (Security Groups)',
          description:
            'Definir as regras de firewall para o banco de dados e a aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Estruturar o Código Terraform em Módulos',
          description:
            'Criar módulos reutilizáveis para cada parte da infra (rede, banco de dados, aplicação).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Usar "Workspaces" do Terraform para os Ambientes',
          description:
            'Criar workspaces para gerenciar os estados de dev, staging e prod separadamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar Lint e Formatação ao Código IaC',
          description:
            'Usar terraform fmt e tflint no pipeline de CI para garantir a qualidade do código.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Gerenciar Segredos com IaC',
          description:
            'Provisionar o AWS Secrets Manager ou similar e referenciar os segredos no código da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Versionar o Código de Infraestrutura no Git',
          description:
            'Realizar commits e gerenciar o código IaC como qualquer outro código da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Plano de Execução no Pipeline de CI',
          description:
            'Rodar terraform plan a cada Pull Request para visualizar as mudanças que serão aplicadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar a Aplicação do Plano no Pipeline de CD',
          description:
            'Rodar terraform apply automaticamente após o merge para a branch principal.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Gerenciar Saídas (Outputs) do Terraform',
          description:
            'Expor informações importantes (ex: URL do banco de dados) como saídas do IaC.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Adicionar o .terraform e .tfstate local ao .gitignore',
          description:
            'Garantir que os arquivos locais do Terraform não sejam enviados ao Git.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Provisionar o Banco de Dados Gerenciado via IaC',
          description:
            'Usar Terraform para criar uma instância RDS (AWS) ou Cloud SQL (GCP) com PostgreSQL.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar a Criptografia do Banco de Dados',
          description:
            'Habilitar a criptografia em repouso (at-rest) para a instância do banco de dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar Backups Automáticos',
          description:
            'Configurar a janela de backup e o período de retenção dos snapshots automáticos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar uma Réplica de Leitura (Read Replica)',
          description:
            'Provisionar uma réplica para descarregar consultas de leitura e aumentar a disponibilidade.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Restringir o Acesso ao Banco de Dados',
          description:
            'Configurar o Security Group para permitir acesso apenas da aplicação, não da internet.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Bucket para Upload de Arquivos',
          description:
            'Provisionar um bucket S3/GCS para que a aplicação armazene os arquivos enviados pelos usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar a Política de CORS do Bucket',
          description:
            'Permitir que o domínio do frontend faça uploads diretamente para o bucket.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar o Versionamento de Objetos no Bucket',
          description:
            'Manter um histórico de versões dos arquivos para prevenir exclusões acidentais.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar uma Política de Ciclo de Vida (Lifecycle Policy)',
          description:
            'Mover arquivos antigos para uma classe de armazenamento mais barata (ex: Glacier).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Usuário IAM com Acesso Restrito ao Bucket',
          description:
            'Gerar chaves de acesso para o backend que só permitem ações no bucket de uploads.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar o Log de Acesso ao Bucket',
          description:
            'Registrar todas as requisições feitas ao bucket para fins de auditoria.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Bucket para os Arquivos Estáticos do Frontend',
          description:
            'Provisionar um bucket S3/GCS separado para hospedar o build do React/Vite.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Bucket do Frontend para Hospedagem de Site Estático',
          description:
            'Habilitar a opção de "static website hosting" e definir os documentos de índice e erro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar o Processo de Restauração de Backup',
          description:
            'Realizar um teste prático de restauração de um snapshot do banco de dados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Provisionar um Banco de Dados de Cache (Redis)',
          description:
            'Usar Terraform para criar uma instância ElastiCache ou Memorystore para caching.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever o Dockerfile para a Aplicação Backend',
          description:
            'Criar um Dockerfile multi-stage otimizado para a aplicação Node.js.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Arquivo .dockerignore',
          description:
            'Ignorar arquivos desnecessários (node_modules, .git) do contexto do build do Docker.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Provisionar um Registro de Contêineres (Container Registry)',
          description:
            'Criar um repositório no ECR (AWS) ou GCR (GCP) para armazenar as imagens Docker.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Pipeline de CI para Construir e Enviar a Imagem',
          description:
            'Adicionar um passo no CI para fazer o build da imagem Docker e enviá-la ao registro a cada commit.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escolher o Serviço de Orquestração',
          description:
            'Decidir entre uma solução serverless (Cloud Run, Fargate) ou baseada em instâncias (ECS, EKS).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Escrever a IaC para o Cluster e Serviço de Orquestração',
          description:
            'Usar Terraform para criar o cluster ECS, a definição da tarefa (Task Definition) e o serviço.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar as Variáveis de Ambiente na Definição da Tarefa',
          description:
            'Injetar as variáveis de ambiente (ex: URL do banco) a partir do Secrets Manager.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Log da Aplicação',
          description:
            'Direcionar os logs do contêiner para o CloudWatch Logs ou serviço equivalente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar a Verificação de Saúde (Health Check)',
          description:
            'Definir um endpoint (/health) na aplicação e configurá-lo no orquestrador.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Auto Scaling para o Serviço',
          description:
            'Criar políticas de escalonamento baseadas no uso de CPU ou memória.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Provisionar um Balanceador de Carga (Load Balancer)',
          description:
            'Usar Terraform para criar um Application Load Balancer (ALB) na frente do serviço do backend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar os "Listeners" e Grupos de Destino (Target Groups)',
          description:
            'Direcionar o tráfego da porta 443 (HTTPS) para os contêineres da aplicação.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Integrar o Logging com uma Ferramenta de Análise',
          description:
            'Configurar o envio de logs do CloudWatch para o Datadog ou similar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar o "Graceful Shutdown" na Aplicação',
          description:
            'Garantir que a aplicação finalize as requisições em andamento antes de parar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Realizar um Teste de Carga Básico',
          description:
            'Usar uma ferramenta (k6, Artillery) para testar a performance do backend e a eficácia do auto scaling.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Pipeline de Build do Frontend',
          description:
            'Adicionar um passo no CI para rodar npm run build e gerar os arquivos estáticos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Deploy para a Plataforma Escolhida',
          description:
            'Criar um passo no CD para sincronizar os arquivos de build para o S3/GCS ou fazer o deploy na Vercel.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Provisionar uma Distribuição de CDN (CloudFront) via IaC',
          description:
            'Usar Terraform para criar uma distribuição de CDN na frente do bucket S3 do frontend.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar a Origem da CDN',
          description:
            'Apontar a CDN para o bucket S3, usando uma "Origin Access Identity" para restringir o acesso direto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar os Comportamentos de Cache da CDN',
          description:
            'Definir políticas de cache otimizadas para diferentes tipos de arquivo (HTML, JS, CSS, imagens).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar a Compressão (Gzip/Brotli) na CDN',
          description:
            'Configurar a CDN para comprimir os arquivos automaticamente.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar a Invalidação de Cache da CDN',
          description:
            'Adicionar um passo no pipeline de CD para invalidar o cache da CDN após um novo deploy.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar o Roteamento de "Single Page Application" (SPA)',
          description:
            'Configurar a CDN ou a plataforma de hospedagem para redirecionar todas as rotas para o index.html.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar os Headers de Segurança na CDN',
          description:
            'Adicionar os headers (CSP, HSTS, etc.) diretamente nas respostas da CDN.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Injetar Variáveis de Ambiente no Build do Frontend',
          description:
            'Garantir que o processo de build tenha acesso às variáveis necessárias (ex: URL da API).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Deploys de "Preview" por Pull Request',
          description:
            'Usar Vercel/Netlify ou um script customizado para gerar um ambiente de preview para cada PR.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Testar a Performance de Carregamento Global',
          description:
            'Usar uma ferramenta para medir o tempo de carregamento do site a partir de diferentes locais do mundo.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar o HTTP/3 na CDN',
          description:
            'Ativar a versão mais recente do protocolo HTTP para melhorar a performance.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar uma Página de Erro Customizada na CDN',
          description:
            'Definir uma página de erro bonita para ser exibida em caso de falhas na origem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar um "Health Check" para a Origem do Frontend',
          description:
            'Configurar a CDN para verificar periodicamente se o bucket S3 está acessível.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o Provedor de DNS',
          description:
            'Delegar o seu domínio para o serviço de DNS do provedor de nuvem (ex: Route 53, Cloud DNS).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar os Registros DNS para a Aplicação',
          description:
            'Criar um registro do tipo "A" ou "CNAME" apontando para a CDN (frontend) e um subdomínio (ex: api.) para o Load Balancer (backend).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Provisionar um Certificado SSL/TLS',
          description:
            "Gerar um certificado gratuito via ACM (AWS) ou Let's Encrypt.",
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Associar o Certificado à CDN e ao Load Balancer',
          description:
            'Configurar a terminação HTTPS, garantindo que todo o tráfego seja criptografado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Forçar o Redirecionamento de HTTP para HTTPS',
          description:
            'Criar uma regra na CDN e no Load Balancer para redirecionar todo o tráfego não seguro.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar um Web Application Firewall (WAF)',
          description:
            'Habilitar o AWS WAF ou Cloud Armor na frente dos seus endpoints públicos.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Aplicar Regras Gerenciadas no WAF',
          description:
            'Ativar conjuntos de regras para proteção contra ameaças comuns (SQL Injection, XSS, OWASP Top 10).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Rate Limiting',
          description:
            'Criar regras no WAF ou no Load Balancer para limitar o número de requisições de um mesmo IP.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Proteção contra DDoS',
          description:
            'Ativar os serviços de mitigação de DDoS padrão do seu provedor (ex: AWS Shield Standard).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Realizar uma Varredura de Vulnerabilidades',
          description:
            'Usar uma ferramenta para escanear as imagens Docker e as dependências da aplicação em busca de vulnerabilidades conhecidas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar o robots.txt',
          description:
            'Criar o arquivo para instruir os crawlers de busca sobre quais páginas não devem ser indexadas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar Registros de DNS para E-mail (SPF, DKIM, DMARC)',
          description:
            'Adicionar os registros para melhorar a entregabilidade e a segurança dos e-mails do seu domínio.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Restringir o Acesso a Endpoints de Admin',
          description:
            'Criar regras de firewall para que apenas IPs específicos possam acessar endpoints de administração.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Habilitar o "Access Logging" no Load Balancer',
          description:
            'Armazenar os logs de todas as requisições que passam pelo balanceador de carga.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Realizar Revisão de Permissões IAM',
          description:
            'Periodicamente, revisar e remover permissões que não são mais necessárias (princípio do menor privilégio).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar um Dashboard de Monitoramento',
          description:
            'Criar um painel no CloudWatch ou Datadog com as métricas chave da aplicação (CPU, memória, latência).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Alertas de Performance para o Backend',
          description:
            'Configurar alarmes para notificar (via Slack, e-mail) se a CPU ou a memória excederem 80%.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Alertas de Erros 5xx',
          description:
            'Configurar um alarme para ser notificado se o número de erros do lado do servidor aumentar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar o Rastreamento de Erros no Frontend e Backend',
          description:
            'Integrar o Sentry ou similar para capturar, agrupar e alertar sobre exceções.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar o Log Estruturado (JSON) na Aplicação',
          description:
            'Configurar a aplicação para gerar logs em formato JSON, facilitando a busca e a análise.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Centralizar os Logs da Aplicação',
          description:
            'Enviar os logs de todos os serviços para uma plataforma centralizada de análise.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Dashboards de Análise de Logs',
          description:
            'Desenvolver painéis para visualizar taxas de erro, logs por rota e outras métricas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar "Health Checks" Sintéticos (Uptime)',
          description:
            'Criar verificações externas que testam a disponibilidade dos endpoints principais a cada minuto.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar Alertas para a Latência da API',
          description:
            'Ser notificado se o tempo de resposta médio da API (p95) exceder um limite.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Monitorar os Custos da Nuvem',
          description:
            'Criar um dashboard para acompanhar a evolução dos custos e identificar anomalias.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar Rastreamento Distribuído (Distributed Tracing)',
          description:
            'Usar OpenTelemetry ou similar para rastrear uma requisição através de múltiplos serviços.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Configurar um "Status Page"',
          description:
            'Criar uma página pública para comunicar o estado dos serviços e incidentes aos usuários.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Plano de Resposta a Incidentes',
          description:
            'Documentar o processo de como a equipe deve agir quando um alerta crítico é disparado.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Monitorar a Expiração de Certificados SSL',
          description:
            'Criar um alerta para ser notificado semanas antes de um certificado SSL expirar.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Agendar a Atualização de Dependências',
          description:
            'Usar ferramentas como o Dependabot para automatizar a criação de PRs para atualizar dependências.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Revisar e Otimizar os Custos Regularmente',
          description:
            'Mensalmente, usar o Cost Explorer para identificar oportunidades de economia (ex: instâncias reservadas).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: '"Right-Sizing" de Recursos',
          description:
            'Analisar as métricas de uso e ajustar o tamanho das instâncias e do banco de dados para evitar desperdício.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Documentar a Infraestrutura',
          description:
            'Manter o diagrama de arquitetura e a documentação do IaC sempre atualizados.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Plano de Recuperação de Desastres (Disaster Recovery)',
          description:
            'Documentar o passo a passo para recuperar a aplicação em caso de falha total de uma região.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar uma Estratégia de Rotação de Segredos',
          description:
            'Configurar a rotação automática de senhas de banco de dados e chaves de API.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar uma Estratégia de "Chaos Engineering"',
          description:
            'Usar ferramentas para injetar falhas de forma controlada em staging para testar a resiliência.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Otimizar a Velocidade do Pipeline de CI/CD',
          description:
            'Analisar e otimizar os passos mais lentos do pipeline (caching de dependências, paralelização).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Arquivar Logs Antigos',
          description:
            'Mover logs com mais de 90 dias para um armazenamento mais barato (ex: S3 Glacier).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Implementar Deploys "Canary"',
          description:
            'Configurar o Load Balancer para direcionar uma pequena porcentagem do tráfego para a nova versão.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Automatizar o "Rollback" em Caso de Falha no Deploy',
          description:
            'Configurar o CD para reverter automaticamente para a versão anterior se os health checks falharem.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Criar um Runbook para Tarefas de Manutenção Comuns',
          description:
            'Documentar o passo a passo para operações rotineiras (ex: reiniciar um serviço).',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },

        {
          name: 'Realizar Auditorias de Segurança Periódicas',
          description:
            'Contratar ou usar ferramentas para realizar testes de penetração e varreduras de segurança.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Medium,
        },
        {
          name: 'Monitorar a Utilização do CDN',
          description:
            'Analisar a taxa de acerto de cache (cache hit ratio) e otimizar as políticas.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Realizar um "Game Day"',
          description:
            'Simular uma falha em um ambiente de staging para testar o processo de resposta a incidentes.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
        {
          name: 'Manter o Código IaC Atualizado',
          description:
            'Periodicamente, atualizar as versões dos providers e módulos do Terraform.',
          status: Enums.Status.Pending,
          project_id: geral.id,
          creator_id: user.id,
          priority: Enums.Priority.Low,
        },
      ],
      { transaction },
    );
    const task00 = tasks[0];
    if (!task00.id) {
      throw new Error('Falha ao criar Tarefa (Tasks) no seeder.');
    }

    // 3. Everything ok
    await transaction.commit();
    console.log('Database task seeded succesfully! 🌱');
  } catch (error) {
    await transaction.rollback();
    console.error('Error seeding database: ', error);
    process.exit();
  } finally {
    await sequelize.close();
  }
}

// Confirmation Function
function startSeederWithConfirmation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('--- Database Seeder Task ---');
  console.warn(
    '\n⚠️  ATENÇÃO: Este script irá apagar TODOS os dados das tabelas [Tasks, Projects, Users] e substituí-los por dados de teste.',
  );

  rl.question('\nVocê tem certeza que deseja continuar? (y/N) ', (answer) => {
    const confirmed = answer.toLocaleLowerCase().trim();

    if (confirmed === 'y' || confirmed === 'yes') {
      console.log('Confirmação recebida. Iniciando o processo de seed...');

      rl.close();

      seedDatabase()
        .then(() => console.log('Seeder script completed.'))
        .catch((error) =>
          console.error('Seeder script execution failed: ', error),
        );
    } else {
      console.log('Operação cancelada pelo usuário.');
      rl.close();
      process.exit(0);
    }
  });
}

// function call
startSeederWithConfirmation();
