src/
│
├── app.module.ts
├── main.ts
│
├── common/                      # utilidades, pipes, guards, interceptors
│   ├── decorators/
│   ├── exceptions/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── utils/
│
├── database/                    # configuración ORM (TypeORM o Prisma)
│   ├── database.module.ts
│   ├── database.providers.ts
│   ├── migrations/
│   └── seed/
│
├── graphql/                     # esquema raíz y resolvers comunes
│   ├── graphql.module.ts
│   └── scalars/                 # DateScalar, JSONScalar, etc.
│
├── modules/                     # cada entidad como un módulo separado
│   ├── books/                   # 📚 Libros
│   │   ├── books.module.ts
│   │   ├── books.resolver.ts
│   │   ├── books.service.ts
│   │   ├── entities/
│   │   │   └── book.entity.ts
│   │   ├── dto/
│   │   │   ├── create-book.input.ts
│   │   │   ├── update-book.input.ts
│   │   │   └── book.output.ts
│   │   └── books.repository.ts
│   │
│   ├── authors/                 # ✍️ Autores
│   │   ├── authors.module.ts
│   │   ├── authors.resolver.ts
│   │   ├── authors.service.ts
│   │   ├── entities/
│   │   │   └── author.entity.ts
│   │   ├── dto/
│   │   │   ├── create-author.input.ts
│   │   │   ├── update-author.input.ts
│   │   │   └── author.output.ts
│   │   └── authors.repository.ts
│   │
│   ├── publishers/              # 🏛️ Editoriales
│   │   ├── publishers.module.ts
│   │   ├── publishers.resolver.ts
│   │   ├── publishers.service.ts
│   │   ├── entities/
│   │   │   └── publisher.entity.ts
│   │   ├── dto/
│   │   └── publishers.repository.ts
│   │
│   ├── collections/             # 📂 Colecciones
│   │   ├── collections.module.ts
│   │   ├── collections.resolver.ts
│   │   ├── collections.service.ts
│   │   ├── entities/
│   │   │   └── collection.entity.ts
│   │   ├── dto/
│   │   └── collections.repository.ts
│   │
│   ├── sections/                # 🗂️ Secciones
│   │   ├── sections.module.ts
│   │   ├── sections.resolver.ts
│   │   ├── sections.service.ts
│   │   ├── entities/
│   │   │   └── section.entity.ts
│   │   ├── dto/
│   │   └── sections.repository.ts
│   │
│   ├── bindings/                # 📖 Encuadernaciones
│   │   ├── bindings.module.ts
│   │   ├── bindings.resolver.ts
│   │   ├── bindings.service.ts
│   │   ├── entities/
│   │   │   └── binding.entity.ts
│   │   ├── dto/
│   │   └── bindings.repository.ts
│
└── tests/                       # pruebas unitarias e2e
    ├── unit/
    └── e2e/
