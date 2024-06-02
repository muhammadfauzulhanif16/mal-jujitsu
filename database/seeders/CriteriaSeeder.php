<?php
  
  namespace Database\Seeders;
  
  use App\Models\Criteria;
  use App\Models\SubCriteria;
  use App\Models\SubSubCriteria;
  use Illuminate\Database\Seeder;
  
  class CriteriaSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $criterias = [
        [
          'name' => 'Etika',
          'sub-criterias' => [
            [
              'name' => 'Kedisiplinan',
              'sub-sub-criterias' => [
                [
                  'name' => 'Kehadiran selama pelatihan',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Waktu kedatangan saat latihan',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
              ],
            ],
            [
              'name' => 'Perilaku',
              'sub-sub-criterias' => [
                [
                  'name' => 'Sikap ketika pelatih memberikan materi',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
                [
                  'name' => 'Sikap ketika melakukan teknik/materi yang diperintahkan',
                  'description' => 'Pilih nilai 1-5',
                  'type' => 'radio',
                ],
              ],
            ],
          ],
        ],
        [
          'name' => 'Teknik Bertanding',
          'sub-criterias' => [
            [
              'name' => 'Ne-Waza',
              'sub-sub-criterias' => [
                [
                  'name' => 'Takedown',
                  'type' => 'text',
                ],
                [
                  'name' => 'Passing guard',
                  'type' => 'text',
                ],
                [
                  'name' => 'Position control',
                  'type' => 'text',
                ],
                [
                  'name' => 'Sweep',
                  'type' => 'text',
                ],
                [
                  'name' => 'Submission',
                  'type' => 'text',
                ],
                [
                  'name' => 'Escape position/submission',
                  'type' => 'text',
                ],
              ],
            ],
            [
              'name' => 'Fighting',
              'sub-sub-criterias' => [
                [
                  'name' => 'Pukulan',
                  'type' => 'text',
                ],
                [
                  'name' => 'Tendangan',
                  'type' => 'text',
                ],
                [
                  'name' => 'Tangkasan',
                  'type' => 'text',
                ],
                [
                  'name' => 'Footwork',
                  'type' => 'text',
                ],
                [
                  'name' => 'Takedown',
                  'type' => 'text',
                ],
                [
                  'name' => 'Passing guard',
                  'type' => 'text',
                ],
                [
                  'name' => 'Position control',
                  'type' => 'text',
                ],
                [
                  'name' => 'Sweep',
                  'type' => 'text',
                ],
                [
                  'name' => 'Submission',
                  'type' => 'text',
                ],
                [
                  'name' => 'Escape position/submission',
                  'type' => 'text',
                ],
              ],
            ],
          ],
        ],
        [
          'name' => 'Fisik',
          'sub-criterias' => [
            [
              'name' => 'Power',
              'sub-sub-criterias' => [
                [
                  'name' => 'Standing board jump',
                  'description' => 'Jarak dalam satuan meter',
                  'type' => 'number',
                ],
                [
                  'name' => 'Vertical jump',
                  'description' => 'Jarak dalam satuan meter',
                  'type' => 'number',
                ],
              ],
            ],
            [
              'name' => 'Flexibility',
              'sub-sub-criterias' => [
                [
                  'name' => 'Sit and react test',
                  'description' => 'Jarak dalam satuan sentimeter',
                  'type' => 'number',
                ],
                [
                  'name' => 'Split flex',
                  'description' => 'Jarak dalam satuan sentimeter',
                  'type' => 'number',
                ],
              ],
            ],
            [
              'name' => 'Speed',
              'sub-sub-criterias' => [
                [
                  'name' => '20 meter speed test',
                  'description' => 'Jarak dalam satuan meter',
                  'type' => 'number',
                ],
                [
                  'name' => '30 meter speed test',
                  'description' => 'Jarak dalam satuan meter',
                  'type' => 'number',
                ],
              ],
            ],
            [
              'name' => 'Agility',
              'sub-sub-criterias' => [
                [
                  'name' => 'Shuttle run',
                  'description' => 'Waktu dalam satuan detik',
                  'type' => 'number',
                ],
                [
                  'name' => '4 cone agility test',
                  'description' => 'Waktu dalam satuan detik',
                  'type' => 'number',
                ],
              ],
            ],
            [
              'name' => 'Muscle Strenght',
              'sub-sub-criterias' => [
                [
                  'name' => 'Push up',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                ],
                [
                  'name' => 'Sit up',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                ],
                [
                  'name' => 'Wall sit',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                ],
                [
                  'name' => 'Bodyweight squad',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                ],
                [
                  'name' => 'Core strength',
                  'description' => 'Hitung dalam satuan repetisi',
                  'type' => 'number',
                ],
              ],
            ],
            [
              'name' => 'VO2MAX',
              'sub-sub-criterias' => [
                [
                  'name' => 'Bleep test',
                  'description' => 'Isi dalam satuan ML/KG/MIN',
                  'type' => 'number',
                ],
                [
                  'name' => 'Cooper test',
                  'description' => 'Isi dalam satuan ML/KG/MIN',
                  'type' => 'number',
                ],
              ],
            ],
          ],
        ],
      ];
      
      foreach ($criterias as $criteria) {
        $criteriaModel = Criteria::create(['name' => $criteria['name']]);
        
        foreach ($criteria['sub-criterias'] as $subCriteria) {
          $subCriteriaData = ['name' => $subCriteria['name'], 'criteria_id' => $criteriaModel->id];
          $subCriteriaModel = SubCriteria::create($subCriteriaData);
          
          foreach ($subCriteria['sub-sub-criterias'] as $subSubCriteria) {
            $subSubCriteriaData = ['name' => $subSubCriteria['name'], 'sub_criteria_id' => $subCriteriaModel->id, 'description' => isset($subSubCriteria['description']) ? $subSubCriteria['description'] : '', 'type' => $subSubCriteria['type']];
            SubSubCriteria::create($subSubCriteriaData);
          }
        }
      }
    }
  }
